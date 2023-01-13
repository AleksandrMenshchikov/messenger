import { FormAvatarError } from '../components/form-avatar-error/form-avatar-error';
import connect from '../core/connect';

const withFormAvatarError = connect((state) => ({
  content: (state.formAvatarError as Record<string, string>).content,
}));
export default withFormAvatarError(FormAvatarError);
