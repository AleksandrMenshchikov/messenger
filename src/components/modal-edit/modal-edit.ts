import './modal-edit.css';
import template from './modal-edit.hbs';
import { Block } from '../../core';
import Input from '../input';
import InputError from '../input-error';
import Button from '../button';

// type ModalEditProps = {

// }

// eslint-disable-next-line import/prefer-default-export
export class ModalEdit extends Block {
// eslint-disable-next-line no-useless-constructor
  // constructor(props: ModalEditProps) {
  //   super(props);
  // }

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
    this.children['input-title'] = new Input({
      id: 'title',
      classValue: 'input',
      type: 'text',
      name: 'title',
      autocomplete: 'off',
      minLength: '3',
      maxLength: '20',
      pattern: '^(?=.*[a-zA-Z])(?:.*[a-zA-Z0-9-_])$',
      events,
    });
    this.children['input-error-title'] = new InputError({ content: 'Введите название чата (от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов, допустимы дефис и нижнее подчёркивание).' });
    this.children.button = new Button({ type: 'submit', content: 'Создать' });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
