import { Messages } from './messages';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document', () => {
    const mock = jest.fn();
    document.body.innerHTML = '<div id="app"></div>';
    const element = new Messages({
      data: { a: '123' },
      onClickDots: mock(),
      onClickClip: mock(),
      onClickProfileArrow: mock(),
    }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const messages = app.querySelector('div') as HTMLElement;
    expect(messages).toBeInTheDocument();
    expect(mock).toHaveBeenCalledTimes(3);
  });
});
