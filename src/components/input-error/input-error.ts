import './input-error.css';
import template from './input-error.hbs';
import { Block } from '../../core';

type InputErrorProps = {
  content: string
}

// eslint-disable-next-line import/prefer-default-export
export class InputError extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: InputErrorProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
