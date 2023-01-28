import router from './Router';

describe('Router', () => {
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
