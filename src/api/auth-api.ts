/* eslint-disable class-methods-use-this */
import httpTransport from '../../utils/HTTPTransport';
import BaseAPI from './base-api';
import URLs from './urls';

class AuthApi extends BaseAPI {
  create(obj: Record<string, unknown>) {
    return httpTransport.post(URLs['https://ya-praktikum.tech/api/v2/auth/signup'], {
      headers: {
        'content-type': 'application/json', // Данные отправляем в формате JSON
      },
      data: obj,
    });
  }

  request() {
    return httpTransport.get(URLs['https://ya-praktikum.tech/api/v2/auth/user'], {});
  }

  delete() {
    return httpTransport.post(URLs['https://ya-praktikum.tech/api/v2/auth/logout'], {});
  }
}

const authApi = new AuthApi();
export default authApi;