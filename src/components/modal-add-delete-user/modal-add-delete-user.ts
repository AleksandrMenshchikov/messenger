import './modal-add-delete-user.css';
import template from './modal-add-delete-user.hbs';
import { Block } from '../../core';

// eslint-disable-next-line import/prefer-default-export
export class ModalAddDeleteUser extends Block {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
