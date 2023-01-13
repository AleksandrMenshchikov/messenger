import './input-file.css';
import template from './input-file.hbs';
import { Block } from '../../core';

type InputFileProps = {
  events?: Record<string, (e: Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class InputFile extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props:InputFileProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
