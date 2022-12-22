import './button-profile.css';
import template from './button-profile.hbs';
import { Block } from '../../core';

type ButtonProps = {
  content: string,
  events?: Record<string, (e?:Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class ButtonProfile extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ButtonProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
