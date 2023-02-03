import notFoundPage from '../pages/404';
import serverErrorPage from '../pages/500';
import loginPage from '../pages/login';
import messengerPage from '../pages/messenger';
import settingsPage from '../pages/settings';
import signupPage from '../pages/signup';
import Route from './Route';
import router, { Router } from './Router';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('Router', () => {
  test('should return Router and calls methods "start", "getRoute", "go", "replace"', () => {
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
    router.getRoute('./');
    expect(Route).toStrictEqual(Route);
    router.go('/any-path');
    expect(window.location.href).toStrictEqual('http://localhost/any-path');
    expect(window.history.length).toStrictEqual(2);
    router.replace('/another-path');
    expect(window.location.href).toStrictEqual('http://localhost/another-path');
    expect(window.history.length).toStrictEqual(2);
  });
});
