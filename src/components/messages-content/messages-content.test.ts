import { MessagesContent } from './messages-content';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document', () => {
    document.body.innerHTML = '<div id="app"></div>';
    const element = new MessagesContent({ data: { a: '123' } }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const messagesContent = app.querySelector('div') as HTMLElement;
    expect(messagesContent).toBeInTheDocument();
  });
});
