import ProfileInput from '../components/profile-input';
import connect from '../core/connect';

const withProfileInputDisplayName = connect((state) => ({
  value: (state.profileInputDisplayName as Record<string, string>).value,
}));
export default withProfileInputDisplayName(ProfileInput);
