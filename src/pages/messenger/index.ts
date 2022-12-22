import './index.css';
import template from './index.hbs';
import { renderDOM, Block } from '../../core';
import Member from '../../components/member';
import Clip from '../../components/clip';
import Dots from '../../components/dots';
import FormMessenger from '../../components/form-messenger';

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

  initChildren(): void {
    this.children.members = {};
    [...new Array(15).keys()].forEach((_, index) => {
      (this.children.members as Record<string, unknown>)[`member${index}`] = new Member();
    });
    this.children.clip = new Clip();
    this.children.dots = new Dots();
    this.children['form-messenger'] = new FormMessenger({
      avatar,
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

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', new Index({
    foto, file, location, arrowLeft, avatar, search, arrowRight,
  }));
});
