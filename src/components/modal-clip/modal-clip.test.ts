import { ModalClip } from './modal-clip';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

const foto: URL = new URL(
  '../../../assets/foto.svg',
  import.meta.url,
);
const file: URL = new URL(
  '../../../assets/file.svg',
  import.meta.url,
);
const location: URL = new URL(
  '../../../assets/location.svg',
  import.meta.url,
);

describe('button', () => {
  test('should be rendered in document', () => {
    document.body.innerHTML = '<div id="app"></div>';
    const element = new ModalClip({
      foto,
      file,
      location,
    }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const modalClip = app.querySelector('div') as HTMLElement;
    expect(modalClip).toBeInTheDocument();
  });
});
