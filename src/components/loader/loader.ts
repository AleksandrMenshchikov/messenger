import './loader.css';
import template from './loader.hbs';
import { Block } from '../../core';

// eslint-disable-next-line import/prefer-default-export
export class Loader extends Block {
  render() {
    return this.compile(template, { });
  }
}
