import './list-members.css';
import template from './list-members.hbs';
import { Block } from '../../core';

type ListMembersProps = {
  data: Record<string, unknown>
}

// eslint-disable-next-line import/prefer-default-export
export class ListMembers extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props:ListMembersProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
