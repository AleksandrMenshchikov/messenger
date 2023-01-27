import router from './Router';

describe('Router', () => {
  describe('router.go("/123")', () => {
    test('should change window.location.href from http://localhost/ to http://localhost/123', () => {
      router.go('/123');
      expect(window.location.href).toBe('http://localhost/121');
    });
  });
});
