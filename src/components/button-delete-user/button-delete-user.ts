import template from './button-delete-user.hbs';
import { Block } from '../../core';

type ButtonDeleteUserProps = {
  events?: Record<string, (e?:Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class ButtonDeleteUser extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ButtonDeleteUserProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
