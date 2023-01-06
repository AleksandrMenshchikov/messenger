/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
export default class BaseAPI {
  // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
  create(args?: unknown) { throw new Error('Not implemented'); }

  request() { throw new Error('Not implemented'); }

  update(args?: unknown) { throw new Error('Not implemented'); }

  delete() { throw new Error('Not implemented'); }
}
