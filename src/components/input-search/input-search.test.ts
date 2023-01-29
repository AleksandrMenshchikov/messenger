import { InputSearch } from './input-search';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

describe('button', () => {
  test('should be rendered in document', () => {
    document.body.innerHTML = '<div id="app"></div>';
    const element = new InputSearch({}).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const inputSearch = app.querySelector('input') as HTMLInputElement;
    expect(inputSearch).toBeInTheDocument();
  });
});
