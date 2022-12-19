import template from './index.hbs';
import { Block, renderDOM } from '../../core';
import Button from '../../components/button';

import './index.css';

class Index extends Block {
  initChildren(): void {
    this.children.button = new Button({
      type: 'submit',
      content: 'Авторизоваться',
      events: {
        click: (e) => {
          e?.preventDefault();
          console.log(e);
        },
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', new Index());
});
