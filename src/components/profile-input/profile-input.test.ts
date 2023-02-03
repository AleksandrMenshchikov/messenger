import { ProfileInput } from './profile-input';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document', () => {
    document.body.innerHTML = '<div id="app"></div>';
    const element = new ProfileInput({
      id: '1',
      classValue: 'any-class',
      type: 'text',
      name: 'any-name',
      autocomplete: 'off',
      minLength: '1',
      maxLength: '3',
      pattern: '',
      value: '123',
    }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const profileInput = app.querySelector('input') as HTMLInputElement;
    expect(profileInput).toBeInTheDocument();
  });
});
