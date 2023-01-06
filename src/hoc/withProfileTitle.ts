import ProfileTitle from '../components/profile-title';
import connect from '../core/connect';

const withProfileTitle = connect((state) => ({
  content: (state.profileTitle as Record<string, string>).content,
}));
export default withProfileTitle(ProfileTitle);
