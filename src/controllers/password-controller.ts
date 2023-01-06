/* eslint-disable class-methods-use-this */
import usersApi from '../api/users-api';

class PasswordController {
  updatePassword(obj: Record<string, unknown>) {
    usersApi.updatePassword(obj).then((res) => {
      console.log(res);
    });
  }
}

const passwordController = new PasswordController();
export default passwordController;
