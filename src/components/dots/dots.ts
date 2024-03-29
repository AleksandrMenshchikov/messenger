import './dots.css';
import template from './dots.hbs';
import { Block } from '../../core';

type DotsProps = {
  events?: Record<string, (e?:Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class Dots extends Block {
// eslint-disable-next-line no-useless-constructor
  constructor(props: DotsProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
