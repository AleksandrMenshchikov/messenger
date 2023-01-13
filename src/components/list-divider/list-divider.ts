import template from './list-divider.hbs';
import { Block } from '../../core';

// eslint-disable-next-line import/prefer-default-export
export class ListDivider extends Block {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
