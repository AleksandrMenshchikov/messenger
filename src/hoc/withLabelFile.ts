import { LabelFile } from '../components/label-file/label-file';
import connect from '../core/connect';

const withLabelFile = connect((state) => ({
  content: (state.labelFile as Record<string, string>).content,
}));
export default withLabelFile(LabelFile);
