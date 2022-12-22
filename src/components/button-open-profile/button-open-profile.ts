import './button-open-profile.css';
import template from './button-open-profile.hbs';
import { Block } from '../../core';

type ButtonOpenProps = {
  events?: Record<string, (e?:Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class ButtonOpenProfile extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ButtonOpenProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
