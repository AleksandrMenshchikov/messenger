import template from 'bundle-text:./index-login.hbs';
import './input-login.css';
import { Block } from '../../core';

// eslint-disable-next-line import/prefer-default-export
export class InputLogin extends Block {
  // eslint-disable-next-line class-methods-use-this
  constructor() {
    super();
    console.log(this.element);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return template;
  }
}
