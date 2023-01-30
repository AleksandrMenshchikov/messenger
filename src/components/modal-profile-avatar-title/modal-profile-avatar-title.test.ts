import { ModalProfileAvatarTitle } from './modal-profile-avatar-title';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document', () => {
    document.body.innerHTML = '<div id="app"></div>';
    const element = new ModalProfileAvatarTitle({ content: 'test-text' }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const modalProfileAvatarTitle = app.querySelector('p') as HTMLElement;
    expect(modalProfileAvatarTitle).toBeInTheDocument();
  });
});
