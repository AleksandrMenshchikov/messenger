/* eslint-disable class-methods-use-this */
import URLs from '../api/urls';
import usersApi from '../api/users-api';
import store from '../core/Store';

class AvatarController {
  updateAvatar(form: FormData) {
    store.set('buttonFormAvatar.content', 'Загрузка...');
    const timer = setTimeout(() => {
      usersApi.updateAvatar(form)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error(`${res.status}`));
        })
        .then((data) => {
          store.set('user.avatar', `${URLs.hostAvatar}${data.avatar}`);
          const modalProfileAvatar = document.body.querySelector('.modal-profile-avatar') as HTMLElement;
          modalProfileAvatar.classList.remove('modal-profile-avatar_active');
        })
        .catch((err) => {
          store.set('formAvatarError.content', 'Что-то пошло нет так:(');
          store.set('buttonFormAvatar.content', 'Поменять');
          console.log(err);
        });
      clearTimeout(timer);
    }, 1000);
  }
}

const avatarController = new AvatarController();
export default avatarController;
