import './form-settings.css';
import template from './form-settings.hbs';
import { Block } from '../../core';
import ButtonProfile from '../button-profile';
import Button from '../button';
import ButtonExit from '../button-exit';
import ProfileInputEmail from '../../hoc/withProfileInputEmail';
import ProfileInputLogin from '../../hoc/withProfileInputLogin';
import ProfileInputFirstName from '../../hoc/withProfileInputFirstName';
import ProfileInputSecondName from '../../hoc/withProfileInputSecondName';
import ProfileInputDisplayName from '../../hoc/withProfileInputDisplayName';
import ProfileInputPhone from '../../hoc/withProfileInputPhone';
import ProfileTitle from '../../hoc/withProfileTitle';
import InputError from '../input-error';
import ButtonAvatar from '../button-avatar';
import logoutController from '../../controllers/logout-controller';
import Input from '../input';

type FormSettingsProps = {
  events: Record<string, (e: Event) => void>
  onClickButtonAvatar: (e?: Event) => void
}

// eslint-disable-next-line import/prefer-default-export
export class FormSettings extends Block {
  profileData: HTMLElement;

  profilePasswords: HTMLElement;

  constructor(props: FormSettingsProps) {
    super(props);
    this.profileData = this.element.querySelector('.profile-data') as HTMLElement;
    this.profilePasswords = this.element.querySelector('.profile-passwords') as HTMLElement;
    this.profilePasswords.style.display = 'none';
  }

  // eslint-disable-next-line class-methods-use-this
  handleInputFocusBlur(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const isValidInput = input.checkValidity();
    if (!isValidInput) {
      input.parentElement?.nextElementSibling?.classList.add('error_active');
    } else {
      input.parentElement?.nextElementSibling?.classList.remove('error_active');
    }
  }

  initChildren(): void {
    const events = {
      focus: (e: Event) => {
        this.handleInputFocusBlur(e);
      },
      blur: (e: Event) => {
        this.handleInputFocusBlur(e);
      },
    };
    this.children.button = new Button({ type: 'submit', content: 'Сохранить' });
    this.children['button-avatar'] = new ButtonAvatar({ events: { click: () => (this.props.onClickButtonAvatar as (e?: Event)=> void)() } });
    this.children['profile-title'] = new ProfileTitle({});
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
    this.children['button-exit'] = new ButtonExit({
      events: {
        click: () => logoutController.logout(),
      },
    });
    this.children['input-email'] = new ProfileInputEmail({
      id: 'email',
      classValue: 'profile__input',
      type: 'email',
      name: 'email',
      minLength: '5',
      maxLength: '100',
      autocomplete: 'email',
      pattern: '^[a-zA-Z]+[a-zA-Z0-9-._]*@[a-zA-Z]+\\.[a-zA-Z]+$',
      events,
    });
    this.children['input-login'] = new ProfileInputLogin({
      id: 'login',
      classValue: 'profile__input',
      type: 'text',
      name: 'login',
      autocomplete: 'off',
      minLength: '3',
      maxLength: '20',
      pattern: '^(?=.*[a-zA-Z])(?:.*[a-zA-Z0-9-_])$',
      events,
    });
    this.children['input-first-name'] = new ProfileInputFirstName({
      id: 'first_name',
      classValue: 'profile__input',
      type: 'text',
      name: 'first_name',
      autocomplete: 'name',
      minLength: '1',
      maxLength: '100',
      pattern: '^[A-ZА-ЯЁ]+[a-zA-Zа-яА-ЯЁё-]*$',
      events,
    });
    this.children['input-second-name'] = new ProfileInputSecondName({
      id: 'second_name',
      classValue: 'profile__input',
      type: 'text',
      name: 'second_name',
      autocomplete: 'family-name',
      minLength: '1',
      maxLength: '100',
      pattern: '^[A-ZА-ЯЁ]+[a-zA-Zа-яА-ЯЁё-]*$',
      events,
    });
    this.children['input-display-name'] = new ProfileInputDisplayName({
      id: 'display_name',
      classValue: 'profile__input',
      type: 'text',
      name: 'display_name',
      autocomplete: 'off',
      minLength: '1',
      maxLength: '100',
      pattern: '^[A-ZА-ЯЁ]+[a-zA-Zа-яА-ЯЁё-]*$',
      events,
    });
    this.children['input-phone'] = new ProfileInputPhone({
      id: 'phone',
      classValue: 'profile__input',
      type: 'tel',
      name: 'phone',
      autocomplete: 'tel',
      minLength: '10',
      maxLength: '15',
      pattern: '^[+]*[0-9]+$',
      events,
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
      events,
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
      events,
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
      events,
    });

    this.children['input-login'].getContent().value = 'ivanivanov';
    this.children['input-first-name'].getContent().value = 'Иван';
    this.children['input-second-name'].getContent().value = 'Иванов';
    this.children['input-display-name'].getContent().value = 'Иван';
    this.children['input-phone'].getContent().value = '+79099673030';
    this.children['input-password-old'].getContent().value = '111111QW';

    this.children['input-error-email'] = new InputError({ content: 'Введите email.' });
    this.children['input-error-login'] = new InputError({ content: 'Введите логин (от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов, допустимы дефис и нижнее подчёркивание).' });
    this.children['input-error-first-name'] = new InputError({ content: 'Введите имя (латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов, допустим только дефис).' });
    this.children['input-error-second-name'] = new InputError({ content: 'Введите фамилию (латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов, допустим только дефис).' });
    this.children['input-error-display-name'] = new InputError({ content: 'Введите имя (латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов, допустим только дефис).' });
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
