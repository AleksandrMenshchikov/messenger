import './modal-users-title.css';
import template from './modal-users-title.hbs';
import { Block } from '../../core';

type ModalUsersTitleProps = {
  title: string
}

// eslint-disable-next-line import/prefer-default-export
export class ModalUsersTitle extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props:ModalUsersTitleProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
