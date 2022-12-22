import './button-exit.css';
import template from './button-exit.hbs';
import { Block } from '../../core';

type ButtonProps = {
  events?: Record<string, (e?:Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class ButtonExit extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ButtonProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
