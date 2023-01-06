/* eslint-disable class-methods-use-this */
import usersApi from '../api/users-api';

class AvatarController {
  updateAvatar(form: FormData) {
    usersApi.updateAvatar(form).then((res) => console.log(res));
  }
}

const avatarController = new AvatarController();
export default avatarController;
