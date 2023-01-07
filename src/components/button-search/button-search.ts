import './button-search.css';
import template from './button-search.hbs';
import { Block } from '../../core';

type ButtonSearchProps = {
  events?: Record<string, (e?:Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class ButtonSearch extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ButtonSearchProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
