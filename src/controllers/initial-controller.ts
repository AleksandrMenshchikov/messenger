/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import authApi from '../api/auth-api';
import Loader from '../components/loader';
import router from '../core/Router';
import store from '../core/Store';
import notFoundPage from '../pages/404';
import serverErrorPage from '../pages/500';
import loginPage from '../pages/login';
import messengerPage from '../pages/messenger';
import settingsPage from '../pages/settings';
import signupPage from '../pages/signup';

class InitialController {
  getUser() {
    const loader = new Loader().getContent();
    document.body.prepend(loader);
    const timer = setTimeout(() => {
      authApi.request().then((res) => {
        if ((res as XMLHttpRequest).status === 200) {
          store.set('isLoggedIn', true);
          store.set('user', JSON.parse((res as XMLHttpRequest).response));
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
    }, 2000);
  }
}

const initialController = new InitialController();
export default initialController;
