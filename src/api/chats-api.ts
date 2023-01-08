/* eslint-disable class-methods-use-this */
import httpTransport from '../../utils/HTTPTransport';
import BaseAPI from './base-api';
import URLs from './urls';

class ChatsApi extends BaseAPI {
  getChats() {
    return httpTransport.get(URLs['https://ya-praktikum.tech/api/v2/chats'], {});
  }

  createChat(title: string) {
    return httpTransport.post(URLs['https://ya-praktikum.tech/api/v2/chats'], {
      headers: {
        'content-type': 'application/json',
      },
      data: {
        title,
      },
    });
  }
}

const chatsApi = new ChatsApi();
export default chatsApi;
