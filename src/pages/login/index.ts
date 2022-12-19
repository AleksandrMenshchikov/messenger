import template from 'bundle-text:./index.hbs';
import { Block, renderDOM, registerComponent } from '../../core';

import './index.css';
import { Input } from '../../components/input/input';
import { InputError } from '../../components/input-error/input-error';

require('babel-core/register');

registerComponent(Input);
registerComponent(InputError);

class Index extends Block {
  constructor() {
    super();
    console.log(this.refs);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return template;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new Index());
});
