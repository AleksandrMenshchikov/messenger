/* eslint-disable class-methods-use-this */
import httpTransport from '../../utils/HTTPTransport';
import BaseAPI from './base-api';
import URLs from './urls';

class AuthApi extends BaseAPI {
  create(obj: Record<string, unknown>) {
    return httpTransport.post(`${URLs.BASE_URL}/auth/signup`, {
      headers: {
        'content-type': 'application/json',
      },
      data: obj,
    });
  }

  request() {
    return httpTransport.get(`${URLs.BASE_URL}/auth/user`, {});
  }

  get(obj: Record<string, unknown>) {
    return httpTransport.post(`${URLs.BASE_URL}/auth/signin`, {
      headers: {
        'content-type': 'application/json',
      },
      data: obj,
    });
  }

  delete() {
    return httpTransport.post(`${URLs.BASE_URL}/auth/logout`, {});
  }
}

const authApi = new AuthApi();
export default authApi;
