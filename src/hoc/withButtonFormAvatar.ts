import { Button } from '../components/button/button';
import connect from '../core/connect';

const withButtonFormAvatar = connect((state) => ({
  content: (state.buttonFormAvatar as Record<string, string>).content,
}));
export default withButtonFormAvatar(Button);
