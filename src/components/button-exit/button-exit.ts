import './button-exit.css';
import template from './button-exit.hbs';
import { Block } from '../../core';

type ButtonProps = {
  events?: Record<string, (e?:Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class ButtonExit extends Block {
  constructor({ events }: ButtonProps) {
    super({ events });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
