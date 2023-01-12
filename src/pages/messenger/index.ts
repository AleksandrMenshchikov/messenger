/* eslint-disable no-param-reassign */
import './index.css';
import template from './index.hbs';
import { Block } from '../../core';
import ButtonOpenProfile from '../../components/button-open-profile';
import router from '../../core/Router';
import ListChats from '../../hoc/withListChats';
import InputSearch from '../../components/input-search';
import ButtonSearch from '../../components/button-search';
import ListUsers from '../../hoc/withListUsers';
import EmptyMessages from '../../components/empty-messages';
import ModalAddDeleteUser from '../../hoc/withModalAddDeleteUser';
import store from '../../core/Store';
import ModalClip from '../../hoc/withModalClip';
import Messages from '../../hoc/withMessages';
import ModalUsers from '../../components/modal-users';
import ButtonEdit from '../../components/button-edit';
import ModalEdit from '../../components/modal-edit';
import chatsController from '../../controllers/chats-controller';

declare global {
  interface Window {
    handleUsers: (id: number)=> void;
    handleChats: (id: number)=> void;
  }
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
    const chatId = store.getState().currentChat.data.id;
    const memberId = store.getState().currentMember.data.id;
    if (store.getState().modalUsersTitle.title === 'Добавить пользователя') {
      chatsController.addUserToChat(chatId, memberId);
    } else {
      chatsController.deleteUserFromChat(chatId, memberId);
    }
  }
};

window.handleChats = function fn(id: number) {
  const state = store.getState().chats;

  let chat = null;
  if (state.data) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in state.data) {
      if (Object.prototype.hasOwnProperty.call(state.data, key)) {
        if (state.data[key].id === id) {
          chat = state.data[key];
        }
      }
    }
    store.set('currentChat.data', null);
    store.set('currentChat.data', chat);
    const list = document.querySelectorAll('.list__item-inner') as NodeList;
    if (list) {
      list.forEach((elem) => {
        if ((elem as HTMLElement).parentElement?.dataset.id === String(id)) {
          (elem as HTMLElement).style.backgroundColor = '#e4edfd';
        } else {
          (elem as HTMLElement).style.backgroundColor = '';
        }
      });
    }
    const emptyMessages = document.querySelector('.empty-messages') as HTMLElement;
    emptyMessages.style.display = 'none';
    chatsController.getTokenChat(id);
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
      if ((e.target as HTMLElement).className === 'modal-users') {
        this.children['modal-users'].hide();
        this.children['modal-users'].children['button-search'].getContent().click();
      }
      if ((e.target as HTMLElement).className === 'modal-edit') {
        this.children['modal-edit'].children['form-edit'].getContent().reset();
        const inputError = this.children['modal-edit'].children['form-edit'].getContent().querySelector('.error');
        inputError.classList.remove('error_active');
        this.children['modal-edit'].hide();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        store.set('modalAddDeleteUser.isOpened', false);
        this.children['modal-add-delete-user'].hide();
        store.set('modalClip.isOpened', false);
        this.children['modal-clip'].hide();
        this.children['modal-users'].hide();
        this.children['modal-users'].children['button-search'].getContent().click();
        this.children['modal-edit'].children['form-edit'].getContent().reset();
        const inputError = this.children['modal-edit'].children['form-edit'].getContent().querySelector('.error');
        inputError.classList.remove('error_active');
        this.children['modal-edit'].hide();
      }
    });
  }

  initChildren(): void {
    this.children['input-search'] = new InputSearch({
      events: {
        input: (e) => {
          if ((e.target as HTMLInputElement).value.trim().length > 0) {
            this.children['button-search'].show();
          } else {
            this.children['button-search'].hide();
          }
        },
      },
    });
    this.children['button-search'] = new ButtonSearch({
      events: {
        click: () => {
          this.children['input-search'].getContent().value = '';
          this.children['button-search'].hide();
        },
      },
    });
    this.children['list-chats'] = new ListChats({});
    this.children['list-users'] = new ListUsers({});
    this.children['button-edit'] = new ButtonEdit({
      events: {
        click: () => {
          const inputError = this.children['modal-edit'].children['form-edit'].getContent().querySelector('.error');
          inputError.classList.remove('error_active');
          this.children['modal-edit'].show();
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
          const { socket } = store.getState();
          if (socket instanceof WebSocket) {
            socket.send(JSON.stringify({
              content,
              type: 'message',
            }));
            socket.send(JSON.stringify({
              content: '0',
              type: 'get old',
            }));
          }
        }
      },
    });
    this.children['empty-messages'] = new EmptyMessages({});
    this.children['modal-add-delete-user'] = new ModalAddDeleteUser({
      onClickButtonAddUser: () => {
        store.set('modalUsersTitle.title', 'Добавить пользователя');
        this.children['modal-users'].show();
        this.children['modal-add-delete-user'].hide();
      },
      onClickButtonDeleteUser: () => {
        store.set('modalUsersTitle.title', 'Удалить пользователя');
        this.children['modal-users'].show();
        this.children['modal-add-delete-user'].hide();
      },
    });
    this.children['modal-clip'] = new ModalClip({ foto, file, location });
    this.children['modal-users'] = new ModalUsers({ search });
    this.children['modal-edit'] = new ModalEdit({});

    this.children['button-search'].hide();
    this.children['list-users'].hide();
    this.children['modal-add-delete-user'].hide();
    this.children['modal-clip'].hide();
    this.children['modal-users'].hide();
    this.children['modal-edit'].hide();
    this.children.messages.hide();
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}

const messengerPage = new MessengerPage({ search });

export default messengerPage;
