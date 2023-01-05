/* eslint-disable class-methods-use-this */
import authApi from '../api/auth-api';
import router from '../core/Router';
import store from '../core/Store';

class LogoutController {
  logout() {
    authApi.delete().then((res) => {
      if ((res as XMLHttpRequest).response === 'OK') {
        store.set('isLoggedIn', false);
        router.replace('/');
      }
    }).catch((err) => console.log(err));
  }
}

const logoutController = new LogoutController();
export default logoutController;
