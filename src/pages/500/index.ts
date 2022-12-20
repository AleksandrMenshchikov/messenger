import template from './index.hbs';
import { renderDOM, Block } from '../../core';

import './index.css';

class Index extends Block {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', new Index());
});
