import './index.css';
import template from './index.hbs';
import { renderDOM, Block } from '../../core';
import Member from '../../components/member';
import Clip from '../../components/clip';
import Dots from '../../components/dots';
import ButtonProfile from '../../components/button-profile';
import Button from '../../components/button';
import ButtonExit from '../../components/button-exit';

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
  constructor({
    foto, file, location, arrowLeft, avatar, search, arrowRight,
  }: Record<string, URL>) {
    super({
      foto, file, location, arrowLeft, avatar, search, arrowRight,
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

    const buttonProfile = this.element.querySelector('.button-profile');
    const profile = this.element.querySelector('.profile');
    const profileArrowImg = this.element.querySelector('.profile__arrow-img');
    const modalProfileAvatar = this.element.querySelector('.modal-profile-avatar');
    const profilFormButtonAvatar = this.element.querySelector('.profile__form-button-avatar');
    const messageArrowRight = this.element.querySelector('.message-arrowRight');
    const messageTextarea = this.element.querySelector('.message-textarea');
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
    messageArrowRight.addEventListener('click', () => {
      const content = messageTextarea.textContent.trim();
      if (content.length > 0) {
        console.log(messageTextarea.textContent.trim());
      }
    });
  }

  initChildren(): void {
    this.children.members = {};
    [...new Array(15).keys()].forEach((_, index) => {
      this.children.members[`member${index}`] = new Member();
    });
    this.children.clip = new Clip();
    this.children.dots = new Dots();
    this.children.button = new Button({ type: 'button', content: 'Сохранить' });
    this.children.button.hide();
    this.children['button-profile-1'] = new ButtonProfile({
      content: 'Изменить данные',
      events: {
        click: () => {
          this.children['button-profile-1'].hide();
          this.children['button-profile-2'].hide();
          this.children['button-exit'].hide();
          this.children.button.show();
        },
      },
    });
    this.children['button-profile-2'] = new ButtonProfile({ content: 'Изменить пароль' });
    this.children['button-exit'] = new ButtonExit({});
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
