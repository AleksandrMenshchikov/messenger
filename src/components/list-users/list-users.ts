import './list-users.css';
import template from './list-users.hbs';
import { Block } from '../../core';
import ListDivider from '../list-divider';

type ListUsersProps = {
  data: Record<string, unknown>
}

// eslint-disable-next-line import/prefer-default-export
export class ListUsers extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props:ListUsersProps) {
    super(props);
  }

  initChildren(): void {
    this.children['list-divider'] = new ListDivider({});
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
