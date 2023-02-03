import { ModalAddDeleteUser } from './modal-add-delete-user';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document', () => {
    const mock = jest.fn();
    document.body.innerHTML = '<div id="app"></div>';
    const element = new ModalAddDeleteUser({
      onClickButtonAddUser: mock(),
      onClickButtonDeleteUser: mock(),
    }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const modalAddDeleteUser = app.querySelector('div') as HTMLElement;
    expect(modalAddDeleteUser).toBeInTheDocument();
    expect(mock).toHaveBeenCalledTimes(2);
  });
});
