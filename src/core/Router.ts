import Route from './Route';
import Block from './Block';

export class Router {
  static __instance: unknown;

  routes: Route[] = [];

  history: History | undefined;

  private _currentRoute: Route | null = null;

  private _rootQuery = '';

  constructor(rootQuery: string) {
    // eslint-disable-next-line no-underscore-dangle
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return, no-underscore-dangle
      return Router.__instance as Router;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    // eslint-disable-next-line no-underscore-dangle
    Router.__instance = this;
  }

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, this._rootQuery);

    this.routes.push(route);

    return this;
  }

  start(cb: () => void) {
    window.onpopstate = (event) => {
      cb();
      this._onRoute((event.currentTarget as Window)?.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history?.pushState({ }, '', pathname);
    this._onRoute(pathname);
  }

  replace(pathname: string) {
    this.history?.replaceState({ }, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history?.back();
  }

  forward() {
    this.history?.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

const router = new Router('#app');
export default router;
