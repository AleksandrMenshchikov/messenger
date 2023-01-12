import template from './messages-content.hbs';
import { Block } from '../../core';

type MessagesContentProps = {
  data: Record<string, unknown>
}

// eslint-disable-next-line import/prefer-default-export
export class MessagesContent extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props:MessagesContentProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
