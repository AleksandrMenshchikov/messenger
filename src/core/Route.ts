import Block from './Block';
import renderDOM from './renderDOM';

export default class Route {
  private _pathname: string;

  private _blockClass: Block;

  private _block: Block | null;

  private _props: Record<string, string>;

  constructor(pathname: string, view: Block, props: Record<string, string>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new (this._blockClass as any)();
      renderDOM(this._props.rootQuery, this._block as Block);
      return;
    }

    this._block.show();
  }
}
