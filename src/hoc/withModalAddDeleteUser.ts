import ModalAddDeleteUser from '../components/modal-add-delete-user';
import connect from '../core/connect';

const withModalAddDeleteUser = connect((state) => ({
  isOpened: (state.modalAddDeleteUser as Record<string, unknown>).isOpened,
}));
export default withModalAddDeleteUser(ModalAddDeleteUser);
