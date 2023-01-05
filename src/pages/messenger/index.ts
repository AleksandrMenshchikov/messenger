import './index.css';
import template from './index.hbs';
import { Block } from '../../core';
import Member from '../../components/member';
import Clip from '../../components/clip';
import Dots from '../../components/dots';
import ButtonOpenProfile from '../../components/button-open-profile';
import ProfileArrow from '../../components/profile-arrow';
import router from '../../core/Router';

const foto: URL = new URL(
  '../../../assets/foto.svg',
  import.meta.url,
);
const file: URL = new URL(
  '../../../assets/file.svg',
  import.meta.url,
);
const location: URL = new URL(
  '../../../assets/location.svg',
  import.meta.url,
);
const search: URL = new URL(
  '../../../assets/search.svg',
  import.meta.url,
);
const arrowRight: URL = new URL(
  '../../../assets/arrowRight.svg',
  import.meta.url,
);

class MessengerPage extends Block {
  messageTextarea: HTMLElement;

  constructor({
    foto, file, location, search, arrowRight,
  }: Record<string, URL>) {
    super({
      foto, file, location, search, arrowRight,
    });
    this.messageTextarea = this.element.querySelector('.message-textarea') as HTMLElement;

    const list = (this.element as HTMLElement).querySelector('.list');
    let strChildren = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.children.members) {
      if (key.includes('member')) {
        if (Object.prototype.hasOwnProperty.call(this.children.members, key)) {
          strChildren += this.children.members[key].getContent().outerHTML;
        }
      }
    }
    list?.insertAdjacentHTML('afterbegin', strChildren);
  }

  initChildren(): void {
    this.children.members = {};
    [...new Array(15).keys()].forEach((_, index) => {
      (this.children.members as Record<string, unknown>)[`member${index}`] = new Member();
    });
    this.children.clip = new Clip();
    this.children.dots = new Dots();
    this.children['button-open-profile'] = new ButtonOpenProfile({
      events: {
        click: () => {
          router.go('/settings');
        },
      },
    });
    this.children['profile-arrow-right'] = new ProfileArrow({
      arrow: arrowRight,
      events: {
        click: () => {
          const content = this.messageTextarea.textContent?.trim();
          if (content && content.length > 0) {
            console.log(this.messageTextarea.textContent?.trim());
          }
        },
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}

const messengerPage = new MessengerPage({
  foto, file, location, search, arrowRight,
});

export default messengerPage;
