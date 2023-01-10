import ListChats from '../components/list-chats';
import connect from '../core/connect';

const withListChats = connect((state) => ({
  data: (state.chats as Record<string, unknown>).data,
}));
export default withListChats(ListChats);
