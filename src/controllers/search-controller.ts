/* eslint-disable class-methods-use-this */
import URLs from '../api/urls';
import usersApi from '../api/users-api';
import store from '../core/Store';

class SearchController {
  searchUsers(login: string) {
    usersApi.searchUsers(login).then((res) => {
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
        store.set('users.data', null);
        store.set('users.data', obj);
      }
    }).catch((err) => console.log(err));
  }
}

const searchController = new SearchController();
export default searchController;
