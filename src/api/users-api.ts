/* eslint-disable class-methods-use-this */
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
}

const usersApi = new UsersApi();
export default usersApi;
