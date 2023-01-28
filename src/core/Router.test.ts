import notFoundPage from '../pages/404';
import serverErrorPage from '../pages/500';
import loginPage from '../pages/login';
import messengerPage from '../pages/messenger';
import settingsPage from '../pages/settings';
import signupPage from '../pages/signup';
import router, { Router } from './Router';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('Router', () => {
  describe('router.use("./", loginPage), router.use("./signup", signupPage), router.use("./settings", settingsPage), router.use("./messenger", messengerPage), router.use("./404", notFoundPage), router.use("./500", serverErrorPage)', () => {
    test('should return Router and call method "start"', () => {
      router.use('./', loginPage);
      router.use('./signup', signupPage);
      router.use('./settings', settingsPage);
      router.use('./messenger', messengerPage);
      router.use('./400', notFoundPage);
      router.use('./500', serverErrorPage);
      expect(Router).toStrictEqual(Router);
      const callback = jest.fn();
      router.start(callback());
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('router.go("/any-path")', () => {
    test('should change window.location.href from http://localhost/ to http://localhost/any-path', () => {
      router.go('/any-path');
      expect(window.location.href).toStrictEqual('http://localhost/any-path');
    });
    test('should change window.history.length from 1 to 2', () => {
      expect(window.history.length).toStrictEqual(2);
    });
  });

  describe('router.replace("/another-path")', () => {
    test('should change window.location.href from http://localhost/ to http://localhost/another-path', () => {
      router.replace('/another-path');
      expect(window.location.href).toStrictEqual('http://localhost/another-path');
    });
    test('do not should change window.history.length', () => {
      expect(window.history.length).toStrictEqual(2);
    });
  });
});
