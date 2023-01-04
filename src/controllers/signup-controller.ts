/* eslint-disable class-methods-use-this */
import authApi from '../api/auth-api';
import store from '../core/Store';

class SignupController {
  createUser(obj: Record<string, unknown>) {
    store.set('auth.isLoading', true);
    const timer = setTimeout(() => {
      authApi.create(obj).then((res) => {
        if ((res as XMLHttpRequest).status === 200) {
          store.set('user', JSON.parse((res as XMLHttpRequest).response));
        } else {
          store.set('auth', {
            isError: true,
            status: (res as XMLHttpRequest).status,
            text: JSON.parse((res as XMLHttpRequest).response).reason,
          });
        }
      }).catch((err) => {
        throw new Error(err);
      }).finally(() => {
        store.set('auth.isLoading', false);
      });
      clearTimeout(timer);
    }, 3000);
  }
}

const signupController = new SignupController();
export default signupController;
