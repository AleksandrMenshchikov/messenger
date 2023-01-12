import MessagesContent from '../components/messages-content';
import connect from '../core/connect';

const withMessagesContent = connect((state) => ({
  data: (state.messagesContent as Record<string, string>).data,
}));
export default withMessagesContent(MessagesContent);
