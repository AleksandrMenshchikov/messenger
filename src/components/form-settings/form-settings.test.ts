import { FormSettings } from './form-settings';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document and work event on submit', () => {
    const mock = jest.fn();
    document.body.innerHTML = '<div id="app"></div>';
    const element = new FormSettings({
      events: {
        submit: mock(),
      },
      onClickButtonAvatar: mock(),
    }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const formSettings = app.querySelector('form') as HTMLFormElement;
    expect(formSettings).toBeInTheDocument();
    expect(mock).toHaveBeenCalledTimes(2);
  });
});
