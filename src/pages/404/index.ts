import './index.css';
import template from './index.hbs';
import { Block } from '../../core';
import ButtonSwitchPage from '../../components/button-switch-page';
import router from '../../core/Router';

class NotFoundPage extends Block {
  // eslint-disable-next-line class-methods-use-this
  initChildren(): void {
    this.children['button-switch-page'] = new ButtonSwitchPage({
      content: 'Назад к чатам',
      events: {
        click: () => router.go('/messenger'),
      },
    });
  }

  render() {
    return this.compile(template, { });
  }
}

const notFoundPage = new NotFoundPage();

export default notFoundPage;
