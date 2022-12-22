import './button-avatar.css';
import template from './button-avatar.hbs';
import { Block } from '../../core';

type ButtonAvatarProps = {
  avatar: URL,
  events?: Record<string, (e: Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class ButtonAvatar extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ButtonAvatarProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
