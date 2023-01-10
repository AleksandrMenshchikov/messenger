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
}

const chatsController = new ChatsController();
export default chatsController;
