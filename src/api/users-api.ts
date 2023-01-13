/* eslint-disable class-methods-use-this */
import httpTransport from '../../utils/HTTPTransport';
import BaseAPI from './base-api';
import URLs from './urls';

class UsersApi extends BaseAPI {
  updateAvatar(form: FormData) {
    return fetch(`${URLs.BASE_URL}/user/profile/avatar`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      body: form,
    });
  }

  updateProfile(obj: Record<string, unknown>) {
    return httpTransport.put(`${URLs.BASE_URL}/user/profile`, {
      headers: {
        'content-type': 'application/json',
      },
      data: obj,
    });
  }

  updatePassword(obj: Record<string, unknown>) {
    return httpTransport.put(`${URLs.BASE_URL}/user/password`, {
      headers: {
        'content-type': 'application/json',
      },
      data: obj,
    });
  }

  searchUsers(login: string) {
    return httpTransport.post(`${URLs.BASE_URL}/user/search`, {
      headers: {
        'content-type': 'application/json',
      },
      data: {
        login,
      },
    });
  }
}

const usersApi = new UsersApi();
export default usersApi;
