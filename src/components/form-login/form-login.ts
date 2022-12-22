import './form-login.css';
import template from './form-login.hbs';
import { Block } from '../../core';
import Button from '../button';
import InputError from '../input-error';
import Input from '../input';

type FormLoginProps ={
  events: Record<string, (e: Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class FormLogin extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: FormLoginProps) {
    super(props);
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
    this.children.button = new Button({
      type: 'submit',
      content: 'Авторизоваться',
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
    this.children['input-error-login'] = new InputError({ content: 'Введите логин (от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов, допустимы дефис и нижнее подчёркивание).' });
    this.children['input-error-password'] = new InputError({ content: 'Введите пароль (от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра).' });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
