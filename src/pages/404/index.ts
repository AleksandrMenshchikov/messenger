import './index.css';
import template from './index.hbs';
import { Block } from '../../core';

class NotFoundPage extends Block {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { });
  }
}

const notFoundPage = new NotFoundPage();

export default notFoundPage;
