import ButtonAvatar from '../components/button-avatar';
import connect from '../core/connect';

const withBattonAvatar = connect((state) => ({
  avatar: (state.user as Record<string, string>).avatar,
}));
export default withBattonAvatar(ButtonAvatar);
