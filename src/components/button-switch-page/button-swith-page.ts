import './button-switch-page.css';
import template from './button-switch-page.hbs';
import { Block } from '../../core';

type ButtonSwitchPageProps = {
  content: string,
  events?: Record<string, (e?:Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class ButtonSwitchPage extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ButtonSwitchPageProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
