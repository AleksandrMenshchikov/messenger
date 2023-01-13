import './modal-clip.css';
import template from './modal-clip.hbs';
import { Block } from '../../core';

type ModalClipProps = {
  foto: URL,
  file: URL,
  location: URL
}

// eslint-disable-next-line import/prefer-default-export
export class ModalClip extends Block {
// eslint-disable-next-line no-useless-constructor
  constructor(props: ModalClipProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
