import PasswordError from '../components/password-error';
import connect from '../core/connect';

const withPasswordError = connect((state) => ({
  content: (state.passwordError as Record<string, string>).content,
}));
export default withPasswordError(PasswordError);
