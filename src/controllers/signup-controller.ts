/* eslint-disable class-methods-use-this */
import authApi from '../api/auth-api';
import router from '../core/Router';
import store from '../core/Store';

class SignupController {
  createUser(obj: Record<string, unknown>) {
    store.set('formMessageError', { content: '' });
    store.set('button.content', 'Загрузка...');
    const timer = setTimeout(() => {
      authApi.create(obj).then((res) => {
        if ((res as XMLHttpRequest).status === 200) {
          authApi.request().then((res) => {
            if ((res as XMLHttpRequest).status === 200) {
              store.set('user', JSON.parse((res as XMLHttpRequest).response));
              router.replace('/messenger');
            }
          }).catch((err) => {
            store.set('formMessageError', { content: 'Что-то пошло не так:(' });
            throw new Error(err);
          }).finally(() => {
            store.set('button.content', 'Зарегистрироваться');
          });
        } else {
          store.set('formMessageError', { content: JSON.parse((res as XMLHttpRequest).response).reason });
        }
      }).catch((err) => {
        store.set('formMessageError', { content: 'Что-то пошло не так:(' });
        throw new Error(err);
      }).finally(() => {
        store.set('button.content', 'Зарегистрироваться');
      });
      clearTimeout(timer);
    }, 2000);
  }
}

const signupController = new SignupController();
export default signupController;
