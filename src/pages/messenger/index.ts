import './index.css';
import template from './index.hbs';
import { Block } from '../../core';
import Clip from '../../components/clip';
import Dots from '../../components/dots';
import ButtonOpenProfile from '../../components/button-open-profile';
import ProfileArrow from '../../components/profile-arrow';
import router from '../../core/Router';
import ListMembers from '../../components/list-members';
import InputSearch from '../../components/input-search';
import searchController from '../../controllers/search-controller';
import ButtonSearch from '../../components/button-search';
import ListUsers from '../../hoc/withListUsers';

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
  }

  initChildren(): void {
    this.children['input-search'] = new InputSearch({
      events: {
        input: (e) => {
          console.log((e.target as HTMLInputElement).value.trim().length);
          if ((e.target as HTMLInputElement).value.trim().length > 0) {
            searchController.searchUsers((e.target as HTMLInputElement).value);
            this.children['list-members'].hide();
            this.children['list-users'].show();
            this.children['button-search'].show();
          } else {
            this.children['list-users'].hide();
            this.children['list-members'].show();
            this.children['button-search'].hide();
          }
        },
      },
    });
    this.children['button-search'] = new ButtonSearch({
      events: {
        click: () => {
          this.children['input-search'].getContent().value = '';
          this.children['list-members'].show();
          this.children['list-users'].hide();
          this.children['button-search'].hide();
        },
      },
    });
    this.children['list-members'] = new ListMembers({
      data: {
        1: { name: 'Alex', text: 'dwdwd' },
        2: { name: 'Mic', text: 'dwdwd' },
      },
    });
    this.children['list-users'] = new ListUsers({});
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

    this.children['button-search'].hide();
    this.children['list-users'].hide();
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
