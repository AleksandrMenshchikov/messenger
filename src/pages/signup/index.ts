import './index.css';
import template from './index.hbs';
import { Block } from '../../core';
import FormSignup from '../../components/form-signup';
import signupController from '../../controllers/signup-controller';

class SignupPage extends Block {
  initChildren(): void {
    this.children['form-signup'] = new FormSignup({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          form.querySelectorAll('input').forEach((elem) => {
            if (elem.checkValidity()) {
              elem.nextElementSibling?.classList.remove('error_active');
            } else {
              elem.nextElementSibling?.classList.add('error_active');
            }
          });
          const inputPassword = form.querySelector('[name=password]') as HTMLInputElement;
          const inputPasswordConfirm = form.querySelector('[name=password-confirm]')as HTMLInputElement;
          if (inputPassword.value !== inputPasswordConfirm.value || inputPasswordConfirm.value === '') {
            inputPasswordConfirm.nextElementSibling?.classList.add('error_active');
          } else {
            inputPasswordConfirm.nextElementSibling?.classList.remove('error_active');
          }
          if (form.checkValidity() && inputPassword.value === inputPasswordConfirm.value) {
            const obj = {
              email: form.email.value,
              login: form.login.value,
              first_name: form.first_name.value,
              second_name: form.second_name.value,
              phone: form.phone.value,
              password: form.password.value,
            };
            signupController.createUser(obj);
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

const signupPage = new SignupPage();
export default signupPage;
