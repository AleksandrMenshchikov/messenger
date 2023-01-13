import { Button } from '../components/button/button';
import connect from '../core/connect';

const withButtonProfile = connect((state) => ({
  content: (state.buttonProfile as Record<string, string>).content,
}));
export default withButtonProfile(Button);
