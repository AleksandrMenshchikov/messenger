import ModalClip from '../components/modal-clip';
import connect from '../core/connect';

const withModalClip = connect((state) => ({
  isOpened: (state.modalClip as Record<string, unknown>).isOpened,
}));
export default withModalClip(ModalClip);
