import './form-avatar-error.css';
import template from './form-avatar-error.hbs';
import { Block } from '../../core';

type FormAvatarErrorProps = {
  content: string,
}

// eslint-disable-next-line import/prefer-default-export
export class FormAvatarError extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: FormAvatarErrorProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
