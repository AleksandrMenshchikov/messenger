import template from './input.hbs';
import './input.css';
import { Block } from '../../core';

// eslint-disable-next-line import/prefer-default-export
export class Input extends Block {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return template;
  }
}
