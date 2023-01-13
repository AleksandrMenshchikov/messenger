import './button-avatar.css';
import template from './button-avatar.hbs';
import { Block } from '../../core';
import Avatar from '../../hoc/withAvatar';

type ButtonAvatarProps = {
  events?: Record<string, (e: Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class ButtonAvatar extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ButtonAvatarProps) {
    super(props);
  }

  initChildren(): void {
    this.children.avatar = new Avatar({});
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
