/* eslint-disable class-methods-use-this */
import httpTransport from '../../utils/HTTPTransport';
import BaseAPI from './base-api';
import URLs from './urls';

class UsersApi extends BaseAPI {
  updateAvatar(form: FormData) {
    return fetch(URLs['https://ya-praktikum.tech/api/v2/user/profile/avatar'], {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      body: form,
    });
  }

  updateProfile(obj: Record<string, unknown>) {
    return httpTransport.put(URLs['https://ya-praktikum.tech/api/v2/user/profile'], {
      headers: {
        'content-type': 'application/json',
      },
      data: obj,
    });
  }

  updatePassword(obj: Record<string, unknown>) {
    return httpTransport.put(URLs['https://ya-praktikum.tech/api/v2/user/password'], {
      headers: {
        'content-type': 'application/json',
      },
      data: obj,
    });
  }

  searchUsers() {
    return httpTransport.post(URLs['https://ya-praktikum.tech/api/v2/user/search'], {
      headers: {
        'content-type': 'application/json',
      },
      data: {
        login: 'string',
      },
    });
  }
}

const usersApi = new UsersApi();
export default usersApi;
