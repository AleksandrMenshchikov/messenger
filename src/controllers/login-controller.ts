/* eslint-disable class-methods-use-this */
import authApi from '../api/auth-api';
import router from '../core/Router';
import store from '../core/Store';

class LoginController {
  getUser(obj: Record<string, unknown>) {
    store.set('formMessageError', { content: '' });
    store.set('button.content', 'Загрузка...');
    const timer = setTimeout(() => {
      authApi.get(obj).then((res) => {
        if ((res as XMLHttpRequest).status === 200) {
          store.set('user', JSON.parse((res as XMLHttpRequest).response));
          router.replace('/messenger');
        } else {
          store.set('formMessageError', { content: JSON.parse((res as XMLHttpRequest).response).reason });
        }
      }).catch((err) => {
        store.set('formMessageError', { content: 'Что-то пошло не так:(' });
        throw new Error(err);
      }).finally(() => {
        store.set('button.content', 'Авторизоваться');
      });
      clearTimeout(timer);
    }, 2000);
  }
}

const loginController = new LoginController();
export default loginController;
