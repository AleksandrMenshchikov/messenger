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
              store.set('isLoggedIn', true);
              store.set('user', JSON.parse((res as XMLHttpRequest).response));
              const state = store.getState();
              store.set('profileInputEmail.value', state.user.email);
              store.set('profileInputLogin.value', state.user.login);
              store.set('profileInputFirstName.value', state.user.first_name);
              store.set('profileInputSecondName.value', state.user.second_name);
              store.set('profileInputDisplayName.value', String(state.user.display_name));
              store.set('profileInputPhone.value', state.user.phone);
              router.replace('/messenger');
            }
          }).catch((err) => {
            store.set('formMessageError', { content: 'Что-то пошло не так:(' });
            console.log(err);
          }).finally(() => {
            store.set('button.content', 'Зарегистрироваться');
          });
        } else {
          store.set('formMessageError', { content: JSON.parse((res as XMLHttpRequest).response).reason });
        }
      }).catch((err) => {
        store.set('formMessageError', { content: 'Что-то пошло не так:(' });
        console.log(err);
      }).finally(() => {
        store.set('button.content', 'Зарегистрироваться');
      });
      clearTimeout(timer);
    }, 2000);
  }
}

const signupController = new SignupController();
export default signupController;
