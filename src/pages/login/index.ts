import template from 'bundle-text:./index.hbs';
import { Block, renderDOM, registerComponent } from '../../core';

import './index.css';

require('babel-core/register');
// import './app.css';

// import Button from './components/button';
// import Link from './components/link';
// import Input from './components/input';
// import Layout from './components/layout';

// registerComponent(Button);
// registerComponent(Link);
// registerComponent(Input);
// registerComponent(Layout);

// TODO: // Добавить MyComponent
class MyComponent extends Block {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return template;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new MyComponent());
});
