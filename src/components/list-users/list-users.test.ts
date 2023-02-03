import { ListUsers } from './list-users';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document', () => {
    document.body.innerHTML = '<div id="app"></div>';
    const element = new ListUsers({ data: { a: '123' } }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const listUsers = app.querySelector('span') as HTMLElement;
    expect(listUsers).toBeInTheDocument();
  });
});
