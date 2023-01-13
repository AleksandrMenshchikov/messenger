import ModalUsersTitle from '../components/modal-users-title';
import connect from '../core/connect';

const withModalUsersTitle = connect((state) => ({
  title: (state.modalUsersTitle as Record<string, string>).title,
}));
export default withModalUsersTitle(ModalUsersTitle);
