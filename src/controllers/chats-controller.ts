/* eslint-disable class-methods-use-this */
import chatsApi from '../api/chats-api';
import URLs from '../api/urls';
import store from '../core/Store';

class ChatsController {
  createChat(title: string) {
    return chatsApi.createChat(title)
      .then((res) => {
        if ((res as XMLHttpRequest).status === 200) {
          const modalEdit = document.querySelector('.modal-edit')?.parentElement as HTMLElement;
          modalEdit.style.display = 'none';
          modalEdit.querySelector('form')?.reset();
          chatsApi.getChats().then((res) => {
            if ((res as XMLHttpRequest).status === 200) {
              const arr: Record<string, unknown>[] = JSON.parse((res as XMLHttpRequest).response);
              const obj = arr.reduce((acc, item, index) => {
                acc[index] = item;
                if ((acc[index] as Record<string, unknown>).avatar) {
                  (acc[index] as Record<string, unknown>).avatar = `${URLs.hostAvatar}${(acc[index] as Record<string, unknown>).avatar}`;
                } else {
                  (acc[index] as Record<string, unknown>).avatar = 'https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png';
                }
                return acc;
              }, {});
              store.set('chats.data', null);
              store.set('chats.data', obj);
            } else {
              console.log(JSON.parse((res as XMLHttpRequest).response.reason));
            }
          }).catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }

  addUserToChat(chatId: number, memberId: number) {
    return chatsApi.addUserToChat(chatId, memberId)
      .then((res) => {
        if ((res as XMLHttpRequest).status === 200) {
          chatsApi.getChatUsers(chatId)
            .then((res) => {
              if ((res as XMLHttpRequest).status === 200) {
                const arr = JSON.parse((res as XMLHttpRequest).response);
                store.set(`chatsUsers.data.${chatId}`, arr);
                const modalUsers = document.querySelector('.modal-users') as HTMLElement;
                const button = modalUsers.querySelector('button')as HTMLButtonElement;
                button.click();
                (modalUsers.parentElement as HTMLElement).style.display = 'none';
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }

  deleteUserFromChat(chatId: number, memberId: number) {
    return chatsApi.deleteUserFromChat(chatId, memberId)
      .then((res) => {
        if ((res as XMLHttpRequest).status === 200) {
          chatsApi.getChatUsers(chatId)
            .then((res) => {
              if ((res as XMLHttpRequest).status === 200) {
                const arr = JSON.parse((res as XMLHttpRequest).response);
                store.set(`chatsUsers.data.${chatId}`, arr);
                const modalUsers = document.querySelector('.modal-users') as HTMLElement;
                const button = modalUsers.querySelector('button')as HTMLButtonElement;
                button.click();
                (modalUsers.parentElement as HTMLElement).style.display = 'none';
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }

  getTokenChat(chatId: number) {
    return chatsApi.getTokenChat(chatId)
      .then((res) => {
        if ((res as XMLHttpRequest).status === 200) {
          const { token } = JSON.parse((res as XMLHttpRequest).response);
          store.set('socket', null);
          const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${store.getState().user.id}/${chatId}/${token}`);
          let timer: NodeJS.Timer;
          socket.addEventListener('open', () => {
            console.log('Соединение установлено');

            socket.send(JSON.stringify({
              content: '0',
              type: 'get old',
            }));

            timer = setInterval(() => {
              socket.send('ping');
            }, 50000);
          });

          socket.addEventListener('close', (event) => {
            clearInterval(timer);
            store.set('currentChat.data', null);
            const list = document.querySelectorAll('.list__item') as NodeList;
            list.forEach((item) => {
            // eslint-disable-next-line no-param-reassign
              (item as HTMLElement).style.backgroundColor = '';
            });
            const emptyMessages = document.querySelector('.empty-messages') as HTMLElement;
            emptyMessages.style.display = 'flex';
            const messages = document.querySelector('.messages') as HTMLElement;
            messages.style.display = 'none';
            if (event.wasClean) {
              console.log('Соединение закрыто чисто');
            } else {
              console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code}`);
          });

          socket.addEventListener('message', (event) => {
            console.log('Получены данные', event.data);
            console.log(store.getState().chats);
          });

          socket.addEventListener('error', () => {
            store.set('currentChat.data', null);
            const list = document.querySelectorAll('.list__item-inner') as NodeList;
            list.forEach((item) => {
            // eslint-disable-next-line no-param-reassign
              (item as HTMLElement).style.backgroundColor = '';
            });
            const emptyMessages = document.querySelector('.empty-messages') as HTMLElement;
            emptyMessages.style.display = 'flex';
            const messages = document.querySelector('.messages') as HTMLElement;
            messages.style.display = 'none';
            console.log('Ошибка соединения');
          });

          store.set('socket', socket);
        }
      })
      .catch((err) => console.log(err));
  }
}

const chatsController = new ChatsController();
export default chatsController;
