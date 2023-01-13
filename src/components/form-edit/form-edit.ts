import template from './form-edit.hbs';
import { Block } from '../../core';
import InputError from '../input-error';
import Button from '../button';
import Input from '../input';

type FormEditProps = {
  events: Record<string, (e: Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class FormEdit extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: FormEditProps) {
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
    this.children['input-title'] = new Input({
      id: 'title',
      classValue: 'input',
      type: 'text',
      name: 'title',
      autocomplete: 'off',
      minLength: '3',
      maxLength: '20',
      pattern: '^.+$',
      events,
    });
    this.children['input-error-title'] = new InputError({ content: 'Введите название чата (от 3 до 20 символов).' });
    this.children.button = new Button({ type: 'submit', content: 'Создать' });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
