import './profile-title.css';
import template from './profile-title.hbs';
import { Block } from '../../core';

type ProfileTitleProps = {
  content: string,
}

// eslint-disable-next-line import/prefer-default-export
export class ProfileTitle extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ProfileTitleProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
