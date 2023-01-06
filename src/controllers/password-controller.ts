/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import usersApi from '../api/users-api';
import store from '../core/Store';

class PasswordController {
  updatePassword(obj: Record<string, unknown>) {
    store.set('passwordError.content', '');
    store.set('buttonProfile.content', 'Загрузка...');
    const timer = setTimeout(() => {
      usersApi.updatePassword(obj)
        .then((res) => {
          store.set('buttonProfile.content', 'Сохранить');
          if ((res as XMLHttpRequest).status !== 200) {
            store.set('passwordError.content', JSON.parse((res as XMLHttpRequest).response).reason);
          } else {
            const profilePasswords = document.body.querySelector('.profile-passwords') as HTMLElement;
            profilePasswords.style.display = 'none';
            const profileData = document.querySelector('.profile-data')as HTMLElement;
            profileData.style.display = 'block';
            const profileFormDataButtons = document.body.querySelector('.profile__form-data-buttons') as HTMLElement;
            profileFormDataButtons.querySelectorAll('button').forEach((elem) => {
              if (elem.className === 'button') {
                elem.style.display = 'none';
              } else {
                elem.style.display = 'block';
              }
              console.log(elem);
            });
          }
        })
        .catch((err) => {
          store.set('buttonProfile.content', 'Сохранить');
          store.set('passwordError.content', 'Что-то пошло не так:(');
          console.log(err);
        });
      clearTimeout(timer);
    }, 1000);
  }
}

const passwordController = new PasswordController();
export default passwordController;
