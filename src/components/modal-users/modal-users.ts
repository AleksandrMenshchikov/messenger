import './modal-users.css';
import template from './modal-users.hbs';
import { Block } from '../../core';

// type ModalUsersProps = {

// }

// eslint-disable-next-line import/prefer-default-export
export class ModalUsers extends Block {
  // eslint-disable-next-line no-useless-constructor
  // constructor(props:ModalUsersProps) {
  //   super(props);
  // }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
