import template from './input.hbs';
import './input.css';
import { Block } from '../../core';

type InputProps = {
  type: string,
  name: string,
  autocomplete: string,
  minLength: string,
  maxLength: string,
  pattern: string,
  events?: Record<string, (e: Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class Input extends Block {
  constructor({
    type, name, autocomplete, minLength, maxLength, pattern, events,
  }:InputProps) {
    super({
      type, name, autocomplete, minLength, maxLength, pattern, events,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
