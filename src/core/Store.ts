import EventBus from './EventBus';
import set from '../../utils/set';

export enum StoreEvents {
  Updated = 'updated',
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  private state: Record<string, any> = {
    isLoggedIn: false,
    user: {
      id: '',
      login: '',
      first_name: '',
      second_name: '',
      email: '',
      phone: '',
      display_name: '',
      avatar: '',
      status: '',
    },
    users: {
      data: null,
    },
    currentMember: {
      data: null,
    },
    chats: {
      data: null,
    },
    chatsUsers: {
      data: {},
    },
    currentChat: {
      data: null,
    },
    button: {
      type: 'submit',
      content: '',
    },
    formMessageError: {
      content: '',
    },
    profileInputEmail: {
      value: '',
    },
    profileInputLogin: {
      value: '',
    },
    profileInputFirstName: {
      value: '',
    },
    profileInputSecondName: {
      value: '',
    },
    profileInputDisplayName: {
      value: '',
    },
    profileInputPhone: {
      value: '',
    },
    profileTitle: {
      content: '',
    },
    labelFile: {
      content: '',
    },
    modalProfileAvatarTitle: {
      content: '',
    },
    formAvatarError: {
      content: '',
    },
    buttonFormAvatar: {
      content: '',
    },
    buttonProfile: {
      content: '',
    },
    passwordError: {
      content: '',
    },
    modalAddDeleteUser: {
      isOpened: false,
    },
    modalClip: {
      isOpened: false,
    },
    modalUsersTitle: {
      title: '',
    },
    socket: WebSocket,
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    // метод EventBus
    this.emit(StoreEvents.Updated);
  }
}

const store = new Store();
export default store;
