import './button.css';
import template from './button.hbs';
import { Block } from '../../core';

type ButtonProps = {
  type: string,
  content: string,
  events?: Record<string, (e?:Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class Button extends Block {
  constructor({ type, content, events }: ButtonProps) {
    super({ type, content, events });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
