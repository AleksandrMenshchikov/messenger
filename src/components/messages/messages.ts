import './messages.css';
import template from './messages.hbs';
import { Block } from '../../core';
import Dots from '../dots';
import Clip from '../clip';
import ProfileArrow from '../profile-arrow';

const arrowRight: URL = new URL(
  '../../../assets/arrowRight.svg',
  import.meta.url,
);

type MessagesProps = {
  data: Record<string, unknown>,
  onClickDots: () => void,
  onClickClip: () => void
  onClickProfileArrow: () => void
}

// eslint-disable-next-line import/prefer-default-export
export class Messages extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props:MessagesProps) {
    super(props);
  }

  initChildren(): void {
    this.children.dots = new Dots({
      events: {
        click: () => (this.props.onClickDots as () => void)(),
      },
    });
    this.children.clip = new Clip({
      events: {
        click: () => (this.props.onClickClip as () => void)(),
      },
    });
    this.children['profile-arrow-right'] = new ProfileArrow({
      arrow: arrowRight,
      events: {
        click: () => (this.props.onClickProfileArrow as () => void)(),
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return this.compile(template, { ...this.props });
  }
}
