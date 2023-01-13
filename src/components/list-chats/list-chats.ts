import './list-chats.css';
import template from './list-chats.hbs';
import { Block } from '../../core';

type ListChatsProps = {
  data: Record<string, unknown>
}

// eslint-disable-next-line import/prefer-default-export
export class ListChats extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props:ListChatsProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
