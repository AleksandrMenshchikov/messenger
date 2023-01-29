import { FormEdit } from './form-edit';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document and work event on submit', () => {
    const mock = jest.fn();
    document.body.innerHTML = '<div id="app"></div>';
    const element = new FormEdit({
      events: {
        submit: mock(),
      },
    }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const formEdit = app.querySelector('.form') as HTMLFormElement;
    expect(formEdit).toBeInTheDocument();
    formEdit.addEventListener('submit', () => {
      mock();
    });
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
