import './avatar.css';
import template from './avatar.hbs';
import { Block } from '../../core';

type AvatarProps = {
  avatar: string,
}

// eslint-disable-next-line import/prefer-default-export
export class Avatar extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: AvatarProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
