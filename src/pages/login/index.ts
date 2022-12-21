import './index.css';
import template from './index.hbs';
import { Block, renderDOM } from '../../core';
import Button from '../../components/button';
import { Input } from '../../components/input/input';
import { InputError } from '../../components/input-error/input-error';

class Index extends Block {
  form: HTMLFormElement;

  constructor() {
    super();
    this.form = this.element.querySelector('form') as HTMLFormElement;
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.form.querySelectorAll('input').forEach((elem) => {
        if (elem.checkValidity()) {
          elem.nextElementSibling?.classList.remove('error_active');
        } else {
          elem.nextElementSibling?.classList.add('error_active');
        }
      });
      if (this.form.checkValidity()) {
        const obj = { login: this.form.login.value, password: this.form.password.value };
        console.log(obj);
      }
    });
  }

  handleInputFocusBlur(e: Event, element: 'login' | 'password') {
    const isValidInputLogin = (e.currentTarget as HTMLInputElement).checkValidity();
    if (!isValidInputLogin) {
      (this.form[element] as HTMLInputElement).nextElementSibling?.classList.add('error_active');
    } else {
      (this.form[element] as HTMLInputElement).nextElementSibling?.classList.remove('error_active');
    }
  }

  initChildren(): void {
    this.children.button = new Button({
      type: 'submit',
      content: 'Авторизоваться',
    });
    this.children['input-login'] = new Input({
      type: 'text',
      name: 'login',
      autocomplete: 'off',
      minLength: '3',
      maxLength: '20',
      pattern: '^(?=.*[a-zA-Z])(?:.*[a-zA-Z0-9-_])$',
      events: {
        focus: (e) => {
          this.handleInputFocusBlur(e, 'login');
        },
        blur: (e) => {
          this.handleInputFocusBlur(e, 'login');
        },
      },
    });
    this.children['input-password'] = new Input({
      type: 'password',
      name: 'password',
      autocomplete: 'current-password',
      minLength: '8',
      maxLength: '40',
      pattern: '^(?=.*[A-Z])(?=.*[0-9])\\S*$',
      events: {
        focus: (e) => {
          this.handleInputFocusBlur(e, 'password');
        },
        blur: (e) => {
          this.handleInputFocusBlur(e, 'password');
        },
      },
    });
    this.children['input-error-login'] = new InputError({ content: 'Введите логин (от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов, допустимы дефис и нижнее подчёркивание).' });
    this.children['input-error-password'] = new InputError({ content: 'Введите пароль (от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра).' });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', new Index());
});
