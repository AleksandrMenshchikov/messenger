import { FormAvatar } from './form-avatar';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document and work event on submit', () => {
    const mock = jest.fn();
    document.body.innerHTML = '<div id="app"></div>';
    const element = new FormAvatar({
      events: {
        submit: mock(),
      },
    }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const formAvatar = app.querySelector('.form-avatar') as HTMLFormElement;
    expect(formAvatar).toBeInTheDocument();
    formAvatar.submit();
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
