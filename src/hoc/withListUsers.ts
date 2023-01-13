import ListUsers from '../components/list-users';
import connect from '../core/connect';

const withListUsers = connect((state) => ({
  data: (state.users as Record<string, unknown>).data,
}));
export default withListUsers(ListUsers);
