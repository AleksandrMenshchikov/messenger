import { Button } from './button';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should work event on click ', () => {
    const mock = jest.fn();
    document.body.innerHTML = '<div id="app"></div>';
    const button = new Button({
      type: 'button',
      content: 'click me',
      events: {
        click: mock(),
      },
    }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(button);
    button.click();
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
