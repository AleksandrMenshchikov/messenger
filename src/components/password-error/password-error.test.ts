import { PasswordError } from './password-error';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document', () => {
    document.body.innerHTML = '<div id="app"></div>';
    const element = new PasswordError({
      content: 'test-text',
    }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const passwordError = app.querySelector('span') as HTMLElement;
    expect(passwordError).toBeInTheDocument();
  });
});
