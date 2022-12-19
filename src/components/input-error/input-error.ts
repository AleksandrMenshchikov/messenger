import template from './input-error.hbs';
import './input-error.css';
import { Block } from '../../core';

// eslint-disable-next-line import/prefer-default-export
export class InputError extends Block {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return template;
  }
}
