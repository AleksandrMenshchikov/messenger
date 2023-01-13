import './modal-profile-avatar-title.css';
import template from './modal-profile-avatar-title.hbs';
import { Block } from '../../core';

type ModalProfileAvatarTitleProps = {
  content: string
}

// eslint-disable-next-line import/prefer-default-export
export class ModalProfileAvatarTitle extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props:ModalProfileAvatarTitleProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
