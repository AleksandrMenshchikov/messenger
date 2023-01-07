import './input-search.css';
import template from './input-search.hbs';
import { Block } from '../../core';

type InputSearchProps = {
  events?: Record<string, (e: Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class InputSearch extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props:InputSearchProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
