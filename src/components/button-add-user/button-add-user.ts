import template from './button-add-user.hbs';
import { Block } from '../../core';

type ButtonAddUserProps = {
  events?: Record<string, (e?:Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class ButtonAddUser extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ButtonAddUserProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
