import Messages from '../components/messages';
import connect from '../core/connect';

const withMessages = connect((state) => ({
  data: (state.currentMember as Record<string, string>).data,
}));
export default withMessages(Messages);
