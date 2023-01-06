import './label-file.css';
import template from './label-file.hbs';
import { Block } from '../../core';

type LabelFileProps = {
  content: string
}

// eslint-disable-next-line import/prefer-default-export
export class LabelFile extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props:LabelFileProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
