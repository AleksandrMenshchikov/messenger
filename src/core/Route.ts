import Block from './Block';
import renderDOM from './renderDOM';

export default class Route {
  private _pathname: string;

  private _blockClass: Block;

  private _block: Block | null;

  private _props: Record<string, unknown>;

  private _rootQuery: string;

  constructor(pathname: string, view: Block, props: Record<string, unknown>, rootQuery: string) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this._rootQuery = rootQuery;
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
      this._block = new (this._blockClass as any)(this._props);
      renderDOM(this._rootQuery, this._block as Block);
      return;
    }

    this._block.show();
  }
}
