import './index.css';
import template from './index.hbs';
import { Block } from '../../core';
import router from '../../core/Router';
import ButtonSwitchPage from '../../components/button-switch-page';

class ServerErrorPage extends Block {
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

const serverErrorPage = new ServerErrorPage();

export default serverErrorPage;
