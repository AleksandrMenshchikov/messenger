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
  compile: any;

  constructor({
    foto, file, location, arrowLeft, avatar, search, arrowRight,
  }: Record<string, URL>) {
    super({
      foto, file, location, arrowLeft, avatar, search, arrowRight,
    });
  }

  initChildren(): void {
    this.children.member = new Member();
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
