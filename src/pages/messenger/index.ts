import './index.css';
import template from './index.hbs';
import { renderDOM, Block } from '../../core';
import Member from '../../components/member';
import Clip from '../../components/clip';
import Dots from '../../components/dots';
import ButtonProfile from '../../components/button-profile';
import Button from '../../components/button';
import ButtonExit from '../../components/button-exit';
import Input from '../../components/input';
import InputError from '../../components/input-error';

const foto: URL = new URL(
  '../../../assets/foto.svg',
  import.meta.url,
);
const file: URL = new URL(
  '../../../assets/file.svg',
  import.meta.url,
);
const location: URL = new URL(
  '../../../assets/location.svg',
  import.meta.url,
);
const arrowLeft: URL = new URL(
  '../../../assets/arrowLeft.svg',
  import.meta.url,
);
const avatar: URL = new URL(
  '../../../assets/avatar.svg',
  import.meta.url,
);
const search: URL = new URL(
  '../../../assets/search.svg',
  import.meta.url,
);
const arrowRight: URL = new URL(
  '../../../assets/arrowRight.svg',
  import.meta.url,
);

class Index extends Block {
  form: HTMLFormElement;

  profilePasswords: HTMLElement;

  profileData: HTMLElement;

  constructor({
    foto, file, location, arrowLeft, avatar, search, arrowRight,
  }: Record<string, URL>) {
    super({
      foto, file, location, arrowLeft, avatar, search, arrowRight,
    });
    this.profileData = this.element.querySelector('.profile-data') as HTMLElement;
    this.profileData.querySelectorAll('input').forEach((elem) => { elem.setAttribute('disabled', 'true'); });
    this.profilePasswords = this.element.querySelector('.profile-passwords') as HTMLElement;
    this.profilePasswords.style.display = 'none';
    this.form = this.element.querySelector('form') as HTMLFormElement;
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
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
            email: this.form.email.value,
            login: this.form.login.value,
            first_name: this.form.first_name.value,
            second_name: this.form.second_name.value,
            phone: this.form.phone.value,
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
        if (counterErrors === 0 && this.form.password.value === this.form['password-confirm'].value) {
          const obj = {
            passwordOld: this.form['password-old'].value,
            password: this.form.password.value,
            passwordNew: this.form['password-confirm'].value,
          };
          console.log(obj);
        } else {
          this.form['password-confirm'].parentElement?.nextElementSibling?.classList.add('error_active');
        }
      }
    });

    const list = (this.element as HTMLElement).querySelector('.list');

    let strChildren = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.children.members) {
      if (key.includes('member')) {
        if (Object.prototype.hasOwnProperty.call(this.children.members, key)) {
          strChildren += this.children.members[key].getContent().outerHTML;
        }
      }
    }
    list?.insertAdjacentHTML('afterbegin', strChildren);

    const buttonProfile = this.element.querySelector('.button-profile') as HTMLElement;
    const profile = this.element.querySelector('.profile') as HTMLElement;
    const profileArrowImg = this.element.querySelector('.profile__arrow-img') as HTMLElement;
    const modalProfileAvatar = this.element.querySelector('.modal-profile-avatar') as HTMLElement;
    const profilFormButtonAvatar = this.element.querySelector('.profile__form-button-avatar') as HTMLElement;
    const messageArrowRight = this.element.querySelector('.message-arrowRight') as HTMLElement;
    const messageTextarea = this.element.querySelector('.message-textarea') as HTMLElement;
    profilFormButtonAvatar.addEventListener('click', () => modalProfileAvatar.classList.add('modal-profile-avatar_active'));
    buttonProfile.addEventListener('click', () => {
      profile.classList.add('profile_active');
    });
    profileArrowImg.addEventListener('click', () => {
      profile.classList.remove('profile_active');
    });
    document.addEventListener(
      'click',
      (e) => e.target === modalProfileAvatar
          && modalProfileAvatar.classList.remove('modal-profile-avatar_active'),
    );
    document.addEventListener(
      'keydown',
      (e) => e.key === 'Escape' && modalProfileAvatar.classList.remove('modal-profile-avatar_active'),
    );
    messageArrowRight.addEventListener('click', () => {
      const content = messageTextarea.textContent?.trim();
      if (content && content.length > 0) {
        console.log(messageTextarea.textContent?.trim());
      }
    });
  }

  handleInputFocusBlur(
    e: Event,
    element: 'login' | 'email' | 'first_name' | 'second_name' | 'phone' | 'password' | 'password-confirm' | 'password-old',
  ) {
    const isValidInput = (e.currentTarget as HTMLInputElement).checkValidity();
    if (!isValidInput) {
      (this.form[element] as HTMLInputElement).parentElement?.nextElementSibling?.classList.add('error_active');
    } else {
      (this.form[element] as HTMLInputElement).parentElement?.nextElementSibling?.classList.remove('error_active');
    }
  }

  initChildren(): void {
    this.children.members = {};
    [...new Array(15).keys()].forEach((_, index) => {
      (this.children.members as Record<string, unknown>)[`member${index}`] = new Member();
    });
    this.children.clip = new Clip();
    this.children.dots = new Dots();
    this.children.button = new Button({ type: 'submit', content: 'Сохранить' });
    this.children['button-profile-1'] = new ButtonProfile({
      content: 'Изменить данные',
      events: {
        click: () => {
          this.profileData.querySelectorAll('input').forEach((elem) => { elem.removeAttribute('disabled'); });
          this.children['button-profile-1'].hide();
          this.children['button-profile-2'].hide();
          this.children['button-exit'].hide();
          this.children.button.show();
        },
      },
    });
    this.children['button-profile-2'] = new ButtonProfile({
      content: 'Изменить пароль',
      events: {
        click: () => {
          this.profilePasswords.style.display = 'block';
          this.profileData.style.display = 'none';
          this.children['button-profile-1'].hide();
          this.children['button-profile-2'].hide();
          this.children['button-exit'].hide();
          this.children.button.show();
        },
      },
    });
    this.children['button-exit'] = new ButtonExit({});
    this.children['input-email'] = new Input({
      id: 'email',
      classValue: 'profile__input',
      type: 'email',
      name: 'email',
      minLength: '5',
      maxLength: '100',
      autocomplete: 'email',
      pattern: '^[a-zA-Z]+[a-zA-Z0-9-._]*@[a-zA-Z]+\\.[a-zA-Z]+$',
      events: {
        focus: (e) => {
          this.handleInputFocusBlur(e, 'email');
        },
        blur: (e) => {
          this.handleInputFocusBlur(e, 'email');
        },
      },
    });
    this.children['input-login'] = new Input({
      id: 'login',
      classValue: 'profile__input',
      type: 'text',
      name: 'login',
      autocomplete: 'off',
      minLength: '3',
      maxLength: '20',
      pattern: '^(?=.*[a-zA-Z])(?:.*[a-zA-Z0-9-_])$',
      events: {
        focus: (e) => {
          this.handleInputFocusBlur(e, 'login');
        },
        blur: (e) => {
          this.handleInputFocusBlur(e, 'login');
        },
      },
    });
    this.children['input-first-name'] = new Input({
      id: 'first_name',
      classValue: 'profile__input',
      type: 'text',
      name: 'first_name',
      autocomplete: 'name',
      minLength: '1',
      maxLength: '100',
      pattern: '^[A-ZА-ЯЁ]+[a-zA-Zа-яА-ЯЁё-]*$',
      events: {
        focus: (e) => {
          this.handleInputFocusBlur(e, 'first_name');
        },
        blur: (e) => {
          this.handleInputFocusBlur(e, 'first_name');
        },
      },
    });
    this.children['input-second-name'] = new Input({
      id: 'second_name',
      classValue: 'profile__input',
      type: 'text',
      name: 'second_name',
      autocomplete: 'family-name',
      minLength: '1',
      maxLength: '100',
      pattern: '^[A-ZА-ЯЁ]+[a-zA-Zа-яА-ЯЁё-]*$',
      events: {
        focus: (e) => {
          this.handleInputFocusBlur(e, 'second_name');
        },
        blur: (e) => {
          this.handleInputFocusBlur(e, 'second_name');
        },
      },
    });
    this.children['input-phone'] = new Input({
      id: 'phone',
      classValue: 'profile__input',
      type: 'tel',
      name: 'phone',
      autocomplete: 'tel',
      minLength: '10',
      maxLength: '15',
      pattern: '^[+]*[0-9]+$',
      events: {
        focus: (e) => {
          this.handleInputFocusBlur(e, 'phone');
        },
        blur: (e) => {
          this.handleInputFocusBlur(e, 'phone');
        },
      },
    });
    this.children['input-password-old'] = new Input({
      id: 'password-old',
      classValue: 'profile__input',
      type: 'password',
      name: 'password-old',
      autocomplete: 'current-password',
      minLength: '8',
      maxLength: '40',
      pattern: '^(?=.*[A-Z])(?=.*[0-9])\\S*$',
      events: {
        focus: (e) => {
          this.handleInputFocusBlur(e, 'password-old');
        },
        blur: (e) => {
          this.handleInputFocusBlur(e, 'password-old');
        },
      },
    });
    this.children['input-password'] = new Input({
      id: 'password',
      classValue: 'profile__input',
      type: 'password',
      name: 'password',
      autocomplete: 'off',
      minLength: '8',
      maxLength: '40',
      pattern: '^(?=.*[A-Z])(?=.*[0-9])\\S*$',
      events: {
        focus: (e) => {
          this.handleInputFocusBlur(e, 'password');
        },
        blur: (e) => {
          this.handleInputFocusBlur(e, 'password');
        },
      },
    });
    this.children['input-password-confirm'] = new Input({
      id: 'password-confirm',
      classValue: 'profile__input',
      type: 'password',
      name: 'password-confirm',
      autocomplete: 'off',
      minLength: '8',
      maxLength: '40',
      pattern: '^(?=.*[A-Z])(?=.*[0-9])\\S*$',
      events: {
        focus: (e) => {
          this.handleInputFocusBlur(e, 'password-confirm');
        },
        blur: (e) => {
          this.handleInputFocusBlur(e, 'password-confirm');
        },
      },
    });
    this.children['input-email'].getContent().value = 'pochta@yandex.ru';
    this.children['input-login'].getContent().value = 'ivanivanov';
    this.children['input-first-name'].getContent().value = 'Иван';
    this.children['input-second-name'].getContent().value = 'Иванов';
    this.children['input-phone'].getContent().value = '+79099673030';
    this.children['input-password-old'].getContent().value = '111111QW';

    this.children['input-error-email'] = new InputError({ content: 'Введите email.' });
    this.children['input-error-login'] = new InputError({ content: 'Введите логин (от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов, допустимы дефис и нижнее подчёркивание).' });
    this.children['input-error-first-name'] = new InputError({ content: 'Введите имя (латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов, допустим только дефис).' });
    this.children['input-error-second-name'] = new InputError({ content: 'Введите фамилию (латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов, допустим только дефис).' });
    this.children['input-error-phone'] = new InputError({ content: 'Введите телефон (от 10 до 15 символов, состоит из цифр, может начинается с плюса).' });
    this.children['input-error-password-old'] = new InputError({ content: 'Введите старый пароль (от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра).' });
    this.children['input-error-password'] = new InputError({ content: 'Введите новый пароль (от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра).' });
    this.children['input-error-password-confirm'] = new InputError({ content: 'Введите ещё раз новый пароль.' });

    this.children.button.hide();
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', new Index({
    foto, file, location, arrowLeft, avatar, search, arrowRight,
  }));
});
