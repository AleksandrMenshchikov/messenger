import './password-error.css';
import template from './password-error.hbs';
import { Block } from '../../core';

type PasswordErrorProps = {
  content: string
}

// eslint-disable-next-line import/prefer-default-export
export class PasswordError extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props:PasswordErrorProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
