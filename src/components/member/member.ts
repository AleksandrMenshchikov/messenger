import template from './member.hbs';
import './member.css';
import { Block } from '../../core';

// eslint-disable-next-line import/prefer-default-export
export class Member extends Block {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { });
  }
}
