import ProfileInput from '../components/profile-input';
import connect from '../core/connect';

const withProfileInputFirstName = connect((state) => ({
  value: (state.profileInputFirstName as Record<string, string>).value,
}));
export default withProfileInputFirstName(ProfileInput);
