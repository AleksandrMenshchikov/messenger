import './input.css';
import template from './input.hbs';
import { Block } from '../../core';

type InputProps = {
  id: string,
  classValue: string,
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
  // eslint-disable-next-line no-useless-constructor
  constructor(props:InputProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
