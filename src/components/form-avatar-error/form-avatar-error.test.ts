import { FormAvatarError } from './form-avatar-error';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document', () => {
    document.body.innerHTML = '<div id="app"></div>';
    const element = new FormAvatarError({
      content: 'test-text',
    }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const formAvatarError = app.querySelector('.form-avatar__error') as HTMLElement;
    expect(formAvatarError).toBeInTheDocument();
  });
});
