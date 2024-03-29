/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import authApi from '../api/auth-api';
import chatsApi from '../api/chats-api';
import URLs from '../api/urls';
import Loader from '../components/loader';
import router from '../core/Router';
import store from '../core/Store';
import notFoundPage from '../pages/404';
import serverErrorPage from '../pages/500';
import loginPage from '../pages/login';
import messengerPage from '../pages/messenger';
import settingsPage from '../pages/settings';
import signupPage from '../pages/signup';

const avatarUrl: URL = new URL(
  '../../assets/avatar.svg',
  import.meta.url,
);

class InitialController {
  getUser() {
    // chatsApi.deleteChat(682);
    const loader = new Loader().getContent();
    document.body.prepend(loader);
    const timer = setTimeout(() => {
      authApi.request().then((res) => {
        if ((res as XMLHttpRequest).status === 200) {
          store.set('isLoggedIn', true);
          store.set('user', JSON.parse((res as XMLHttpRequest).response));
          const state = store.getState();
          if (state.user.avatar) {
            store.set('user.avatar', `${URLs.BASE_URL_AVATAR}${state.user.avatar}`);
          } else {
            store.set('user.avatar', avatarUrl);
          }
          store.set('profileInputEmail.value', state.user.email);
          store.set('profileInputLogin.value', state.user.login);
          store.set('profileInputFirstName.value', state.user.first_name);
          store.set('profileInputSecondName.value', state.user.second_name);
          store.set('profileInputDisplayName.value', String(state.user.display_name));
          store.set('profileInputPhone.value', state.user.phone);
          store.set('profileTitle.content', String(state.user.display_name));

          chatsApi.getChats().then((res) => {
            if ((res as XMLHttpRequest).status === 200) {
              const arr: Record<string, unknown>[] = JSON.parse((res as XMLHttpRequest).response);
              const obj = arr.reduce((acc, item, index) => {
                acc[index] = item;
                if ((acc[index] as Record<string, unknown>).avatar) {
                  (acc[index] as Record<string, unknown>).avatar = `${URLs.BASE_URL_AVATAR}${(acc[index] as Record<string, unknown>).avatar}`;
                } else {
                  (acc[index] as Record<string, unknown>).avatar = 'https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png';
                }
                return acc;
              }, {});
              store.set('chats.data', null);
              store.set('chats.data', obj);
            } else {
              console.log(JSON.parse((res as XMLHttpRequest).response.reason));
            }
          }).catch((err) => console.log(err));
        }
      }).catch((err) => {
        console.log(err);
        router.replace('/500');
      }).finally(() => {
        loader.remove();

        let _404 = '/404';
        if (!['/', '/signup', '/settings', '/messenger'].includes(window.location.pathname)) {
          _404 = window.location.pathname !== '/500' ? window.location.pathname : '/404';
        }

        router
          .use('/', loginPage)
          .use('/signup', signupPage)
          .use('/settings', settingsPage)
          .use('/messenger', messengerPage)
          .use(_404, notFoundPage)
          .use('/500', serverErrorPage)
          .start(() => {
            if (!store.getState().isLoggedIn) {
              if (['/settings', '/messenger'].includes(window.location.pathname)) {
                router.replace('/');
              }
            }
            store.set('formMessageError.content', '');
            if (window.location.pathname === '/') {
              store.set('button.content', 'Авторизоваться');
            } else if (window.location.pathname === '/signup') {
              store.set('button.content', 'Зарегистрироваться');
            }
          });

        if (window.location.pathname === '/') {
          store.set('button.content', 'Авторизоваться');
        } else if (window.location.pathname === '/signup') {
          store.set('button.content', 'Зарегистрироваться');
        }

        if (store.getState().isLoggedIn) {
          if (['/', '/signup'].includes(window.location.pathname)) {
            router.replace('/messenger');
          }
        } else if (window.location.pathname === '/') {
          router.replace('/');
        } else if (window.location.pathname === '/signup') {
          router.replace('/signup');
        } else {
          router.replace('/');
        }
      });
      clearTimeout(timer);
    }, 1000);
  }
}

const initialController = new InitialController();
export default initialController;
