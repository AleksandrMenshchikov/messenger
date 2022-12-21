import template from './index.hbs';
import './index.css';
import { renderDOM, Block } from '../../core';
import Member from '../../components/member';

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
const arrowLeft: URL = new URL(
  '../../../assets/arrowLeft.svg',
  import.meta.url,
);
const avatar: URL = new URL(
  '../../../assets/avatar.svg',
  import.meta.url,
);
const search: URL = new URL(
  '../../../assets/search.svg',
  import.meta.url,
);
const arrowRight: URL = new URL(
  '../../../assets/arrowRight.svg',
  import.meta.url,
);

class Index extends Block {
  constructor({
    foto, file, location, arrowLeft, avatar, search, arrowRight,
  }: Record<string, URL>) {
    super({
      foto, file, location, arrowLeft, avatar, search, arrowRight,
    });
    const list = (this.element as HTMLElement).querySelector('.list');

    let strChildren = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.children) {
      if (Object.prototype.hasOwnProperty.call(this.children, key)) {
        strChildren += this.children[key].getContent().outerHTML;
      }
    }
    list?.insertAdjacentHTML('afterbegin', strChildren);
  }

  initChildren(): void {
    [...new Array(15).keys()].forEach((_, index) => {
      this.children[`member${index}`] = new Member();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', new Index({
    foto, file, location, arrowLeft, avatar, search, arrowRight,
  }));
});
