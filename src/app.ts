import Router from './core/Router';
import SignupPage from './pages/signup';
import settingsPage from './pages/settings';
import messengerPage from './pages/messenger';
import LoginPage from './pages/login';
import serverErrorPage from './pages/500';
import notFoundPage from './pages/404';

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router('#app');
  router
    .use('/', LoginPage)
    .use('/signup', SignupPage)
    .start();
});
