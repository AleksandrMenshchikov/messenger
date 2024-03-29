import './button-edit.css';
import template from './button-edit.hbs';
import { Block } from '../../core';

type ButtonEditProps = {
  events?: Record<string, (e?:Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class ButtonEdit extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ButtonEditProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
