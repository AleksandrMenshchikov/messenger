import Avatar from '../components/avatar';
import connect from '../core/connect';

const withAvatar = connect((state) => ({
  avatar: (state.user as Record<string, string>).avatar,
}));
export default withAvatar(Avatar);
