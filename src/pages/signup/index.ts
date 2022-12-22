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
      const inputPassword = this.form.querySelector('[name=password]') as HTMLInputElement;
      const inputPasswordConfirm = this.form.querySelector('[name=password-confirm]')as HTMLInputElement;
      if (inputPassword.value !== inputPasswordConfirm.value || inputPasswordConfirm.value === '') {
        inputPasswordConfirm.nextElementSibling?.classList.add('error_active');
      } else {
        inputPasswordConfirm.nextElementSibling?.classList.remove('error_active');
      }
      if (this.form.checkValidity() && inputPassword.value === inputPasswordConfirm.value) {
        const obj = {
          email: this.form.email.value,
          login: this.form.login.value,
          first_name: this.form.first_name.value,
          second_name: this.form.second_name.value,
          phone: this.form.phone.value,
          password: this.form.password.value,
        };
        console.log(obj);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleInputFocusBlur(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const isValidInput = input.checkValidity();
    if (!isValidInput) {
      input.nextElementSibling?.classList.add('error_active');
    } else {
      input.nextElementSibling?.classList.remove('error_active');
    }
  }

  initChildren(): void {
    const events = {
      focus: (e: Event) => {
        this.handleInputFocusBlur(e);
      },
      blur: (e: Event) => {
        this.handleInputFocusBlur(e);
      },
    };
    this.children['input-email'] = new Input({
      id: 'email',
      classValue: 'input',
      type: 'email',
      name: 'email',
      minLength: '5',
      maxLength: '100',
      autocomplete: 'email',
      pattern: '^[a-zA-Z]+[a-zA-Z0-9-._]*@[a-zA-Z]+\\.[a-zA-Z]+$',
      events,
    });
    this.children['input-login'] = new Input({
      id: 'login',
      classValue: 'input',
      type: 'text',
      name: 'login',
      autocomplete: 'off',
      minLength: '3',
      maxLength: '20',
      pattern: '^(?=.*[a-zA-Z])(?:.*[a-zA-Z0-9-_])$',
      events,
    });
    this.children['input-first-name'] = new Input({
      id: 'first_name',
      classValue: 'input',
      type: 'text',
      name: 'first_name',
      autocomplete: 'name',
      minLength: '1',
      maxLength: '100',
      pattern: '^[A-ZА-ЯЁ]+[a-zA-Zа-яА-ЯЁё-]*$',
      events,
    });
    this.children['input-second-name'] = new Input({
      id: 'second_name',
      classValue: 'input',
      type: 'text',
      name: 'second_name',
      autocomplete: 'family-name',
      minLength: '1',
      maxLength: '100',
      pattern: '^[A-ZА-ЯЁ]+[a-zA-Zа-яА-ЯЁё-]*$',
      events,
    });
    this.children['input-phone'] = new Input({
      id: 'phone',
      classValue: 'input',
      type: 'tel',
      name: 'phone',
      autocomplete: 'tel',
      minLength: '10',
      maxLength: '15',
      pattern: '^[+]*[0-9]+$',
      events,
    });
    this.children['input-password'] = new Input({
      id: 'password',
      classValue: 'input',
      type: 'password',
      name: 'password',
      autocomplete: 'current-password',
      minLength: '8',
      maxLength: '40',
      pattern: '^(?=.*[A-Z])(?=.*[0-9])\\S*$',
      events,
    });
    this.children['input-password-confirm'] = new Input({
      id: 'password-confirm',
      classValue: 'input',
      type: 'password',
      name: 'password-confirm',
      autocomplete: 'current-password',
      minLength: '8',
      maxLength: '40',
      pattern: '^(?=.*[A-Z])(?=.*[0-9])\\S*$',
      events,
    });
    this.children['input-error-email'] = new InputError({ content: 'Введите email.' });
    this.children['input-error-login'] = new InputError({ content: 'Введите логин (от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов, допустимы дефис и нижнее подчёркивание).' });
    this.children['input-error-first-name'] = new InputError({ content: 'Введите имя (латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов, допустим только дефис).' });
    this.children['input-error-second-name'] = new InputError({ content: 'Введите фамилию (латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов, допустим только дефис).' });
    this.children['input-error-phone'] = new InputError({ content: 'Введите телефон (от 10 до 15 символов, состоит из цифр, может начинается с плюса).' });
    this.children['input-error-password'] = new InputError({ content: 'Введите пароль (от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра).' });
    this.children['input-error-password-confirm'] = new InputError({ content: 'Введите ещё раз пароль.' });
    this.children.button = new Button({
      type: 'submit',
      content: 'Зарегистрироваться',
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
