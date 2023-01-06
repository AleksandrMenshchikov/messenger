import './form-avatar.css';
import template from './form-avatar.hbs';
import { Block } from '../../core';
import store from '../../core/Store';
import ModalProfileAvatarTitle from '../../hoc/withModalProfileAvatarTitle';
import LabelFile from '../../hoc/withLabelFile';
import InputFile from '../input-file';
import Button from '../button';
import FormAvatarError from '../../hoc/withFormAvatarError';

type FormAvatarProps ={
  events: Record<string, (e: Event) => void>
}

// eslint-disable-next-line import/prefer-default-export
export class FormAvatar extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: FormAvatarProps) {
    super(props);
  }

  initChildren(): void {
    this.children['modal-profile-avatar-title'] = new ModalProfileAvatarTitle({});
    this.children['label-file'] = new LabelFile({});
    this.children['input-file'] = new InputFile({
      events:
      {
        change: (e) => {
          store.set('modalProfileAvatarTitle.content', 'Файл загружен');
          store.set('labelFile.content', (e.target as HTMLInputElement).files?.[0].name);
          store.set('formAvatarError.content', '');
        },
      },
    });
    this.children.button = new Button({ type: 'submit', content: 'Поменять' });
    this.children['form-avatar-error'] = new FormAvatarError({});
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
