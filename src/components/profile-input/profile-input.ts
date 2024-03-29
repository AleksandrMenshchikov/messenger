import './profile-input.css';
import template from './profile-input.hbs';
import { Block } from '../../core';

type ProfileInputProps = {
  id: string,
  classValue: string,
  type: string,
  name: string,
  autocomplete: string,
  minLength: string,
  maxLength: string,
  pattern: string,
  value: string,
  events?: Record<string, (e: Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class ProfileInput extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props:ProfileInputProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
