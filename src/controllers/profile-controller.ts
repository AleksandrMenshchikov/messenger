/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import URLs from '../api/urls';
import usersApi from '../api/users-api';
import store from '../core/Store';

class ProfileController {
  updateProfile(obj: Record<string, unknown>) {
    store.set('buttonProfile.content', 'Загрузка...');
    const timer = setTimeout(() => {
      usersApi.updateProfile(obj)
        .then((res) => {
          if ((res as XMLHttpRequest).status === 200) {
            const { avatar, ...rest } = JSON.parse((res as XMLHttpRequest).response);
            if (avatar) {
              store.set('user.avatar', `${URLs.BASE_URL_AVATAR}${avatar}`);
            }
            store.set('user', rest);
            store.set('profileTitle.content', rest.display_name);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          store.set('buttonProfile.content', 'Сохранить');
          const profileData = document.body.querySelector('.profile-data') as HTMLElement;
          const profileFormDataButtons = document.body.querySelector('.profile__form-data-buttons') as HTMLElement;
          profileData.querySelectorAll('input').forEach((elem) => { elem.setAttribute('disabled', 'true'); });
          profileFormDataButtons.querySelectorAll('button').forEach((elem) => {
            if (elem.className === 'button') {
              elem.style.display = 'none';
            } else {
              elem.style.display = 'block';
            }
          });
        });
      clearTimeout(timer);
    }, 1000);
  }
}

const profileController = new ProfileController();
export default profileController;
