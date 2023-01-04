import EventBus from './EventBus';
import set from '../../utils/set';

export enum StoreEvents {
  Updated = 'updated',
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  private state: Record<string, any> = {
    button: {
      type: 'submit',
      content: 'Зарегистрироваться',
    },
    formMessageError: {
      content: '',
    },
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    // метод EventBus
    this.emit(StoreEvents.Updated);
  }
}

const store = new Store();
export default store;