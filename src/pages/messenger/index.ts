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
import EmptyMessages from '../../components/empty-messages';
import ModalAddDeleteUser from '../../hoc/withModalAddDeleteUser';
import store from '../../core/Store';
import ModalClip from '../../hoc/withModalClip';

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

  messagesFooter: HTMLElement;

  constructor({ search, arrowRight }: Record<string, URL>) {
    super({ search, arrowRight });
    this.messageTextarea = this.element.querySelector('.message-textarea') as HTMLElement;
    this.messagesFooter = this.element.querySelector('.messages__footer') as HTMLElement;

    this.element.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).closest('.modal-add-delete-user') && !(e.target as HTMLElement).closest('.dots-container')) {
        store.set('modalAddDeleteUser.isOpened', false);
        this.children['modal-add-delete-user'].hide();
      }
      if (!(e.target as HTMLElement).closest('.modal-clip') && !(e.target as HTMLElement).closest('.clip-container')) {
        store.set('modalClip.isOpened', false);
        this.children['modal-clip'].hide();
      }
    });
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        store.set('modalAddDeleteUser.isOpened', false);
        this.children['modal-add-delete-user'].hide();
        store.set('modalClip.isOpened', false);
        this.children['modal-clip'].hide();
      }
    });
  }

  initChildren(): void {
    this.children['input-search'] = new InputSearch({
      events: {
        input: (e) => {
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
    this.children.clip = new Clip({
      events: {
        click: () => {
          const state = store.getState();
          store.set('modalClip.isOpened', !state.modalClip.isOpened);
          if (state.modalClip.isOpened) {
            const messagesFooterHeight = this.messagesFooter.getBoundingClientRect().height;
            this.children['modal-clip'].getContent()
              .querySelector('.modal-clip').style.bottom = `${messagesFooterHeight + 20}px`;
            this.children['modal-clip'].show();
          } else {
            this.children['modal-clip'].hide();
          }
        },
      },
    });
    this.children.dots = new Dots({
      events: {
        click: () => {
          const state = store.getState();
          store.set('modalAddDeleteUser.isOpened', !state.modalAddDeleteUser.isOpened);
          if (state.modalAddDeleteUser.isOpened) {
            this.children['modal-add-delete-user'].show();
          } else {
            this.children['modal-add-delete-user'].hide();
          }
        },
      },
    });
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
    this.children['empty-messages'] = new EmptyMessages({});
    this.children['modal-add-delete-user'] = new ModalAddDeleteUser({});
    this.children['modal-clip'] = new ModalClip({ foto, file, location });

    this.children['button-search'].hide();
    this.children['list-users'].hide();
    this.children['modal-add-delete-user'].hide();
    this.children['modal-clip'].hide();
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}

const messengerPage = new MessengerPage({ search, arrowRight });

export default messengerPage;
