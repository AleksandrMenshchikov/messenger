import { Button } from '../components/button/button';
import connect from '../core/connect';

const withButton = connect((state) => ({
  type: (state.button as Record<string, string>).type,
  content: (state.button as Record<string, string>).content,
}));
export default withButton(Button);
