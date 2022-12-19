import template from 'bundle-text:./index.hbs';
import { Block, renderDOM, registerComponent } from '../../core';

import './index.css';
import { Input } from '../../components/input/input';
import { InputError } from '../../components/input-error/input-error';
import { Button } from '../../components/button/button';

require('babel-core/register');

registerComponent(Input);
registerComponent(InputError);
registerComponent(Button);

class Index extends Block {
  constructor() {
    super();
    const form = this.element?.querySelector('.form') as HTMLFormElement;
    const {
      login, loginError, password, passwordError,
    } = this.refs;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form.checkValidity()) {
        const obj = {
          login: (login as HTMLInputElement).value,
          password: (password as HTMLInputElement).value,
        };
        console.log(obj);
      }
      if (!(login as HTMLInputElement).checkValidity()) {
        loginError.classList.add('error_active');
      } else {
        loginError.classList.remove('error_active');
      }
      if (!(password as HTMLInputElement).checkValidity()) {
        passwordError.classList.add('error_active');
      } else {
        passwordError.classList.remove('error_active');
      }
    });
    login.addEventListener('focus', () => {
      if (!(login as HTMLInputElement).checkValidity()) {
        loginError.classList.add('error_active');
      }
    });
    login.addEventListener('blur', () => {
      if ((login as HTMLInputElement).checkValidity()) {
        loginError.classList.remove('error_active');
      }
    });
    password.addEventListener('focus', () => {
      if (!(password as HTMLInputElement).checkValidity()) {
        passwordError.classList.add('error_active');
      }
    });
    password.addEventListener('blur', () => {
      if ((password as HTMLInputElement).checkValidity()) {
        passwordError.classList.remove('error_active');
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return template;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new Index());
});
