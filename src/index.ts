/* eslint-disable no-underscore-dangle */
import router from './core/Router';
import signupPage from './pages/signup';
import settingsPage from './pages/settings';
import messengerPage from './pages/messenger';
import loginPage from './pages/login';
import serverErrorPage from './pages/500';
import notFoundPage from './pages/404';
import store from './core/Store';
import initialController from './controllers/initial-controller';

document.addEventListener('DOMContentLoaded', () => {
  initialController.getUser();
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
});
