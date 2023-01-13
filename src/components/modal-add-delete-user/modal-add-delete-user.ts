import './modal-add-delete-user.css';
import template from './modal-add-delete-user.hbs';
import { Block } from '../../core';
import ButtonAddUser from '../button-add-user';
import ButtonDeleteUser from '../button-delete-user';

type ModalAddDeleteUserProps = {
  onClickButtonAddUser: () => void
  onClickButtonDeleteUser: () => void
}

// eslint-disable-next-line import/prefer-default-export
export class ModalAddDeleteUser extends Block {
// eslint-disable-next-line no-useless-constructor
  constructor(props: ModalAddDeleteUserProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  initChildren(): void {
    this.children['button-add-user'] = new ButtonAddUser({
      events: {
        click: () => (this.props.onClickButtonAddUser as () => void)(),
      },
    });
    this.children['button-delete-user'] = new ButtonDeleteUser({
      events: {
        click: () => (this.props.onClickButtonDeleteUser as () => void)(),
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
