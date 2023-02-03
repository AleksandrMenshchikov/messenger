import { EmptyMessages } from './empty-messages';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document', () => {
    document.body.innerHTML = '<div id="app"></div>';
    const element = new EmptyMessages().getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const emptyMessages = app.querySelector('.empty-messages') as HTMLElement;
    expect(emptyMessages).toBeInTheDocument();
  });
});
