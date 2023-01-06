import ModalProfileAvatarTitle from '../components/modal-profile-avatar-title';
import connect from '../core/connect';

const withModalProfileAvatarTitle = connect((state) => ({
  content: (state.modalProfileAvatarTitle as Record<string, string>).content,
}));
export default withModalProfileAvatarTitle(ModalProfileAvatarTitle);
