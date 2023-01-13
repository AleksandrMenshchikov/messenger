import ProfileInput from '../components/profile-input';
import connect from '../core/connect';

const withProfileInputEmail = connect((state) => ({
  value: (state.profileInputEmail as Record<string, string>).value,
}));
export default withProfileInputEmail(ProfileInput);
