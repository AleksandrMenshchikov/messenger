import { Input } from './input';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document', () => {
    document.body.innerHTML = '<div id="app"></div>';
    const element = new Input({
      id: '1',
      classValue: 'any-class',
      type: 'text',
      name: 'any-name',
      autocomplete: 'off',
      minLength: '1',
      maxLength: '3',
      pattern: '',
    }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const input = app.querySelector('input') as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });
});
