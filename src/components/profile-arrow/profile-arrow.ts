import './profile-arrow.css';
import template from './profile-arrow.hbs';
import { Block } from '../../core';

type ProfileArrowProps = {
  arrow: URL,
  events?: Record<string, (e: Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class ProfileArrow extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ProfileArrowProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
