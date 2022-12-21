import './input-error.css';
import template from './input-error.hbs';
import { Block } from '../../core';

type InputErrorProps = {
  content: string
}

// eslint-disable-next-line import/prefer-default-export
export class InputError extends Block {
  constructor({ content }: InputErrorProps) {
    super({ content });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
