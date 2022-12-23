import './dots.css';
import template from './dots.hbs';
import { Block } from '../../core';

// eslint-disable-next-line import/prefer-default-export
export class Dots extends Block {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { });
  }
}
