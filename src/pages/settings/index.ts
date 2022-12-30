import './index.css';
import template from './index.hbs';
import { Block } from '../../core';
import FormSettings from '../../components/form-settings';
import ProfileArrow from '../../components/profile-arrow';

const arrowLeft: URL = new URL(
  '../../../assets/arrowLeft.svg',
  import.meta.url,
);

class SettingsPage extends Block {
  profilePasswords: HTMLElement;

  profileData: HTMLElement;

  modalProfileAvatar: HTMLElement;

  constructor({
    arrowLeft,
  }: Record<string, URL>) {
    super({
      arrowLeft,
    });
    this.modalProfileAvatar = this.element.querySelector('.modal-profile-avatar') as HTMLElement;
    this.profileData = this.element.querySelector('.profile-data') as HTMLElement;
    this.profileData.querySelectorAll('input').forEach((elem) => { elem.setAttribute('disabled', 'true'); });
    this.profilePasswords = this.element.querySelector('.profile-passwords') as HTMLElement;
    this.profilePasswords.style.display = 'none';

    this.element.addEventListener('click', (e) => {
      if (e.target === this.modalProfileAvatar) {
        this.element.style.height = 'auto';
        this.element.style.overflow = 'auto';
        this.modalProfileAvatar.classList.remove('modal-profile-avatar_active');
      }
    });
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.element.style.height = 'auto';
        this.element.style.overflow = 'auto';
        this.modalProfileAvatar.classList.remove('modal-profile-avatar_active');
      }
    });
  }

  initChildren(): void {
    this.children['profile-arrow-left'] = new ProfileArrow({
      arrow: arrowLeft,
      events: {
        click: () => {
          console.log('click profile-arrow-left');
        },
      },
    });
    this.children['form-settings'] = new FormSettings({
      onClickButtonAvatar: () => {
        this.element.style.height = '100vh';
        this.element.style.overflow = 'hidden';
        this.modalProfileAvatar.classList.add('modal-profile-avatar_active');
      },
      events: {
        submit: (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          let counterErrors = 0;
          if (this.profilePasswords.style.display === 'none') {
            this.profileData.querySelectorAll('input').forEach((elem) => {
              if (elem.checkValidity()) {
                elem.parentElement?.nextElementSibling?.classList.remove('error_active');
              } else {
                counterErrors += 1;
                elem.parentElement?.nextElementSibling?.classList.add('error_active');
              }
            });
            if (counterErrors === 0) {
              const obj = {
                email: form.email.value,
                login: form.login.value,
                first_name: form.first_name.value,
                second_name: form.second_name.value,
                phone: form.phone.value,
              };
              console.log(obj);
            }
          } else {
            this.profilePasswords.querySelectorAll('input').forEach((elem) => {
              if (elem.checkValidity()) {
                elem.parentElement?.nextElementSibling?.classList.remove('error_active');
              } else {
                counterErrors += 1;
                elem.parentElement?.nextElementSibling?.classList.add('error_active');
              }
            });
            if (counterErrors === 0 && form.password.value === form['password-confirm'].value) {
              const obj = {
                passwordOld: form['password-old'].value,
                password: form.password.value,
                passwordNew: form['password-confirm'].value,
              };
              console.log(obj);
            } else {
              form['password-confirm'].parentElement?.nextElementSibling?.classList.add('error_active');
            }
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

const settingsPage = new SettingsPage({
  arrowLeft,
});

export default settingsPage;