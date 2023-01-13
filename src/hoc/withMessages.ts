import Messages from '../components/messages';
import connect from '../core/connect';

const withMessages = connect((state) => ({
  data: (state.currentChat as Record<string, string>).data,
}));
export default withMessages(Messages);
