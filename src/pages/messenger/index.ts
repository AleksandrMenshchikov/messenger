import './index.css';
import template from './index.hbs';
import { Block } from '../../core';
import ButtonOpenProfile from '../../components/button-open-profile';
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
import Messages from '../../hoc/withMessages';

declare global {
  interface Window { handleUsers: (id: number)=> void; }
}

window.handleUsers = function fn(id: number) {
  const state = store.getState().users;
  let user = null;
  if (state.data) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in state.data) {
      if (Object.prototype.hasOwnProperty.call(state.data, key)) {
        if (state.data[key].id === id) {
          user = state.data[key];
        }
      }
    }
    store.set('currentMember.data', null);
    store.set('currentMember.data', user);
  }
};

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

class MessengerPage extends Block {
  constructor({ search }: Record<string, URL>) {
    super({ search });

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
    this.children['button-open-profile'] = new ButtonOpenProfile({
      events: {
        click: () => {
          router.go('/settings');
        },
      },
    });
    this.children.messages = new Messages({
      onClickDots: () => {
        const state = store.getState();
        store.set('modalAddDeleteUser.isOpened', !state.modalAddDeleteUser.isOpened);
        if (state.modalAddDeleteUser.isOpened) {
          this.children['modal-add-delete-user'].show();
        } else {
          this.children['modal-add-delete-user'].hide();
        }
      },
      onClickClip: () => {
        const state = store.getState();
        store.set('modalClip.isOpened', !state.modalClip.isOpened);
        if (state.modalClip.isOpened) {
          const messagesFooterHeight = (this.element.querySelector('.messages__footer') as HTMLElement).getBoundingClientRect().height;
          this.children['modal-clip'].getContent()
            .querySelector('.modal-clip').style.bottom = `${messagesFooterHeight + 20}px`;
          this.children['modal-clip'].show();
        } else {
          this.children['modal-clip'].hide();
        }
      },
      onClickProfileArrow: () => {
        const content = (this.element.querySelector('.message-textarea') as HTMLElement).textContent?.trim();
        if (content && content.length > 0) {
          console.log(content);
        }
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

const messengerPage = new MessengerPage({ search });

export default messengerPage;
