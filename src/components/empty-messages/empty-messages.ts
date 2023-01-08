import './empty-messages.css';
import template from './empty-messages.hbs';
import { Block } from '../../core';

// eslint-disable-next-line import/prefer-default-export
export class EmptyMessages extends Block {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { });
  }
}
