/* eslint-disable no-underscore-dangle */
import router from './core/Router';
import signupPage from './pages/signup';
import settingsPage from './pages/settings';
import messengerPage from './pages/messenger';
import loginPage from './pages/login';
import serverErrorPage from './pages/500';
import notFoundPage from './pages/404';
import httpTransport from '../utils/HTTPTransport';

document.addEventListener('DOMContentLoaded', () => {
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
    .start();
});
