import { FormLogin } from './form-login';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document and work event on submit', () => {
    const mock = jest.fn();
    document.body.innerHTML = '<div id="app"></div>';
    const element = new FormLogin({
      events: {
        submit: mock(),
      },
    }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const formLogin = app.querySelector('.form') as HTMLFormElement;
    expect(formLogin).toBeInTheDocument();
    formLogin.addEventListener('submit', () => {
      mock();
    });
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
