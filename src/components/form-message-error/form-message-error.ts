import './form-message-error.css';
import template from './form-message-error.hbs';
import { Block } from '../../core';

type FormMessageErrorProps = {
  content: string,
}

// eslint-disable-next-line import/prefer-default-export
export class FormMessageError extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: FormMessageErrorProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
