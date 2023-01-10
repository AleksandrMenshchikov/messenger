import './modal-edit.css';
import template from './modal-edit.hbs';
import { Block } from '../../core';
import FormEdit from '../form-edit';

// type ModalEditProps = {

// }

// eslint-disable-next-line import/prefer-default-export
export class ModalEdit extends Block {
// eslint-disable-next-line no-useless-constructor
  // constructor(props: ModalEditProps) {
  //   super(props);
  // }

  initChildren(): void {
    this.children['form-edit'] = new FormEdit({
      events: {
        submit: (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const input = form.querySelector('input') as HTMLInputElement;
          if (input?.value.trim().length > 2) {
            input.nextElementSibling?.classList.remove('error_active');
            const obj = { title: input.value.trim() };
            console.log(obj);
          } else {
            input?.nextElementSibling?.classList.add('error_active');
          }
        },
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
