import { nanoid } from 'nanoid';
import EventBus from './EventBus';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  private _id = nanoid(6);

  private _meta: { props: unknown; };

  protected props: Record<string, unknown>;

  protected eventBus: () => EventBus;

  private _element: unknown;

  protected children: Record<string, unknown>;

  constructor(propsAndChildren: Record<string, unknown> = {}) {
    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;
    this.initChildren();
    const eventBus = new EventBus();
    this._meta = { props };
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  initChildren() {}

  // eslint-disable-next-line class-methods-use-this
  _getChildren(propsAndChildren: Record<string, unknown>) {
    const children: Record<string, unknown> = {};
    const props: Record<string, unknown> = {};
    Object.entries((propsAndChildren)).forEach(([key, value]) => {
      if (value instanceof Block) {
        (children as Record<string, unknown>)[key] = value;
      } else if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props };
  }

  compile(template: (context: unknown) => string, props: Record<string, unknown>) {
    const propsAndStubs = { ...props };
    Object.entries(this.children).forEach(([key, child]) => {
      // eslint-disable-next-line no-underscore-dangle
      propsAndStubs[key] = `<div data-id="${(child as Block)._id}"></div>`;
    });
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    const htmlString = template(propsAndStubs);
    fragment.innerHTML = htmlString;
    Object.values(this.children).forEach((child) => {
      // eslint-disable-next-line no-underscore-dangle
      const stub = fragment.content.querySelector(`[data-id="${(child as Block)._id}"]`);
      if (!stub) {
        return;
      }
      stub.replaceWith((child as Block).getContent());
    });
    return fragment.content;
  }

  _addEvents() {
    const { events = {} } = this.props;
    if (!events || !this._element) {
      return;
    }
    Object.entries(events).forEach(([event, listener]) => {
      (this._element as HTMLElement).addEventListener(event, listener);
    });
  }

  _removeEvents() {
    const { events } = this.props;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      (this._element as HTMLElement).removeEventListener(event, listener);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      (child as Block).dispatchComponentDidMount();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount(oldProps?: Record<string, unknown>) { return ''; }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>) {
    return true;
  }

  setProps = (nextProps: Record<string, unknown>) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild;
    if (this._element) {
      this._removeEvents();
      (this._element as HTMLElement).replaceWith(newElement as HTMLElement);
    }
    this._element = newElement;
    this._addEvents();
  }

  // eslint-disable-next-line class-methods-use-this
  render(): DocumentFragment { return new DocumentFragment(); }

  getContent() {
    return this.element as HTMLElement;
  }

  _makePropsProxy(props: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as string];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldProps = { ...target };
        // eslint-disable-next-line no-param-reassign
        target[prop as string] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
