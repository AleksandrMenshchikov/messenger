import './clip.css';
import template from './clip.hbs';
import { Block } from '../../core';

type ClipProps = {
  events?: Record<string, (e?:Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class Clip extends Block {
// eslint-disable-next-line no-useless-constructor
  constructor(props: ClipProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
