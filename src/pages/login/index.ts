import './index.css';
import template from './index.hbs';
import { Block } from '../../core';
import FormLogin from '../../components/form-login';

class LoginPage extends Block {
  initChildren(): void {
    this.children['form-login'] = new FormLogin({
      events: {
        submit: (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          form.querySelectorAll('input').forEach((elem) => {
            if (elem.checkValidity()) {
              elem.nextElementSibling?.classList.remove('error_active');
            } else {
              elem.nextElementSibling?.classList.add('error_active');
            }
          });
          if (form.checkValidity()) {
            const obj = { login: form.login.value, password: form.password.value };
            console.log(obj);
          }
        },
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { });
  }
}

const loginPage = new LoginPage();

export default loginPage;
