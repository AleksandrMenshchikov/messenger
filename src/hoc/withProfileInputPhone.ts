import ProfileInput from '../components/profile-input';
import connect from '../core/connect';

const withProfileInputPhone = connect((state) => ({
  value: (state.profileInputPhone as Record<string, string>).value,
}));
export default withProfileInputPhone(ProfileInput);
