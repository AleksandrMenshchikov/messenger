import template from './index.hbs';
import { Block, renderDOM } from '../../core';
import Button from '../../components/button';
import { Input } from '../../components/input/input';
import { InputError } from '../../components/input-error/input-error';

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
    this.children['input-login'] = new Input({
      type: 'text', name: 'login', autocomplete: 'off', minLength: '3', maxLength: '20', pattern: '^(?=.*[a-zA-Z])(?:.*[a-zA-Z0-9-_])$',
    });
    this.children['input-password'] = new Input({
      type: 'password', name: 'password', autocomplete: 'current-password', minLength: '8', maxLength: '40', pattern: '^(?=.*[A-Z])(?=.*[0-9])\\S*$',
    });
    this.children['input-error-login'] = new InputError({ content: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).' });
    this.children['input-error-login'] = new InputError({ content: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.' });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', new Index());
});
