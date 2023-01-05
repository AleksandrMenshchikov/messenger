/* eslint-disable class-methods-use-this */
import authApi from '../api/auth-api';
import router from '../core/Router';
import store from '../core/Store';

class InitialController {
  getUser() {
    authApi.request().then((res) => {
      if ((res as XMLHttpRequest).status === 200) {
        store.set('isLoggedIn', true);
        store.set('user', JSON.parse((res as XMLHttpRequest).response));
      }
    }).catch((err) => {
      router.replace('/500');
      console.log(err);
    });
  }
}

const initialController = new InitialController();
export default initialController;
