import Block from './Block';
import renderDOM from './renderDOM';

export default class Route {
  _pathname: string;

  private _block: Block;

  private _rootQuery: string;

  constructor(pathname: string, view: Block, rootQuery: string) {
    this._pathname = pathname;
    this._block = view;
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
    renderDOM(this._rootQuery, this._block);
    this._block.show();
  }
}
