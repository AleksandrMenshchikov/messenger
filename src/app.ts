import { renderDOM } from './core';
import signupPage from './pages/signup';
import settingsPage from './pages/settings';
import messengerPage from './pages/messenger';
import loginPage from './pages/login';
import serverErrorPage from './pages/500';
import notFoundPage from './pages/404';

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', messengerPage);
});
