import { ProfileArrow } from './profile-arrow';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (99000 - 10000) + 10000) }));

const arrowRight: URL = new URL(
  '../../../assets/arrowRight.svg',
  import.meta.url,
);

describe('button', () => {
  test('should be rendered in document', () => {
    document.body.innerHTML = '<div id="app"></div>';
    const element = new ProfileArrow({
      arrow: arrowRight,
    }).getContent();
    const app = document.body.querySelector('#app') as HTMLDivElement;
    app.appendChild(element);
    const profileArrow = app.querySelector('button') as HTMLElement;
    expect(profileArrow).toBeInTheDocument();
  });
});
