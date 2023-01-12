/* eslint-disable class-methods-use-this */
import httpTransport from '../../utils/HTTPTransport';
import BaseAPI from './base-api';
import URLs from './urls';

class ChatsApi extends BaseAPI {
  getChats() {
    return httpTransport.get(`${URLs.BASE_URL}/chats`, {});
  }

  createChat(title: string) {
    return httpTransport.post(`${URLs.BASE_URL}/chats`, {
      headers: {
        'content-type': 'application/json',
      },
      data: {
        title,
      },
    });
  }

  deleteChat(chatId: number) {
    return httpTransport.delete(`${URLs.BASE_URL}/chats`, {
      headers: {
        'content-type': 'application/json',
      },
      data: {
        chatId,
      },
    });
  }

  addUserToChat(chatId: number, memberId: number) {
    return httpTransport.put(`${URLs.BASE_URL}/chats/users`, {
      headers: {
        'content-type': 'application/json',
      },
      data: {
        users: [
          memberId,
        ],
        chatId,
      },
    });
  }

  deleteUserFromChat(chatId: number, memberId: number) {
    return httpTransport.delete(`${URLs.BASE_URL}/chats/users`, {
      headers: {
        'content-type': 'application/json',
      },
      data: {
        users: [
          memberId,
        ],
        chatId,
      },
    });
  }

  getChatUsers(chatId: number) {
    return httpTransport.get(`${URLs.BASE_URL}/chats/${chatId}/users`, {});
  }

  getTokenChat(chatId: number) {
    return httpTransport.post(`${URLs.BASE_URL}/chats/token/${chatId}`, {});
  }
}

const chatsApi = new ChatsApi();
export default chatsApi;
