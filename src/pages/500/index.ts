import './index.css';
import template from './index.hbs';
import { Block } from '../../core';

class ServerErrorPage extends Block {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { });
  }
}

const serverErrorPage = new ServerErrorPage();

export default serverErrorPage;
