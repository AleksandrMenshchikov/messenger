import { ModalUsers } from './modal-users';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

const search: URL = new URL(
  '../../../assets/search.svg',
  import.meta.url,
);

describe('button', () => {
  test('should be rendered in document', () => {
    const mock = jest.fn();
    document.body.innerHTML = '<div id="app"></div>';
    const element = new ModalUsers({
      events: {
        click: mock(),
      },
      search,
    }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const modalUsers = app.querySelector('p') as HTMLElement;
    expect(modalUsers).toBeInTheDocument();
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
