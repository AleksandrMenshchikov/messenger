import formMessageError from '../components/form-message-error';
import connect from '../core/connect';

const withButton = connect((state) => ({
  content: (state.formMessageError as Record<string, string>).content,
}));
export default withButton(formMessageError);
