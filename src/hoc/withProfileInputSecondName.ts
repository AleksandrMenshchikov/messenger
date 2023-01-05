import ProfileInput from '../components/profile-input';
import connect from '../core/connect';

const withProfileInputSecondName = connect((state) => ({
  value: (state.profileInputSecondName as Record<string, string>).value,
}));
export default withProfileInputSecondName(ProfileInput);
