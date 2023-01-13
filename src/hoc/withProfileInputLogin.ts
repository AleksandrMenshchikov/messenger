import ProfileInput from '../components/profile-input';
import connect from '../core/connect';

const withProfileInputLogin = connect((state) => ({
  value: (state.profileInputLogin as Record<string, string>).value,
}));
export default withProfileInputLogin(ProfileInput);
