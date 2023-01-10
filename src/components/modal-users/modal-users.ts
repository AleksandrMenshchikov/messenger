import './modal-users.css';
import template from './modal-users.hbs';
import { Block } from '../../core';
import InputSearch from '../input-search';
import ButtonSearch from '../button-search';
import searchController from '../../controllers/search-controller';
import ListUsers from '../../hoc/withListUsers';
import ModalUsersTitle from '../../hoc/withModalUsersTitle';

type ModalUsersProps = {
  events?: Record<string, (e?:Event) => void>
  search: URL
}

// eslint-disable-next-line import/prefer-default-export
export class ModalUsers extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props:ModalUsersProps) {
    super(props);
  }

  initChildren(): void {
    this.children['modal-users-title'] = new ModalUsersTitle({ });
    this.children['input-search'] = new InputSearch({
      events: {
        input: (e) => {
          if ((e.target as HTMLInputElement).value.trim().length > 0) {
            searchController.searchUsers((e.target as HTMLInputElement).value);
            this.children['list-users'].show();
            this.children['button-search'].show();
            this.children['list-users'].children['list-divider'].show();
          } else {
            this.children['list-users'].hide();
            this.children['button-search'].hide();
            this.children['list-users'].children['list-divider'].hide();
          }
        },
      },
    });
    this.children['button-search'] = new ButtonSearch({
      events: {
        click: () => {
          this.children['input-search'].getContent().value = '';
          this.children['list-users'].hide();
          this.children['button-search'].hide();
        },
      },
    });
    this.children['list-users'] = new ListUsers({});

    this.children['button-search'].hide();
    this.children['list-users'].children['list-divider'].hide();
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
