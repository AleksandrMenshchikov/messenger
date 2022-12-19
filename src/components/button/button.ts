import template from 'bundle-text:./button.hbs';
import './button.css';
import { Block } from '../../core';

// eslint-disable-next-line import/prefer-default-export
export class Button extends Block {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return template;
  }
}
