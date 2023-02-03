import { ListChats } from './list-chats';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document', () => {
    document.body.innerHTML = '<div id="app"></div>';
    const element = new ListChats({
      data: {
        a: '123',
      },
    }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const listChats = app.querySelector('ul') as HTMLElement;
    expect(listChats).toBeInTheDocument();
  });
});
