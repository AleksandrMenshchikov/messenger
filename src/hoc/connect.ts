import isEqual from '../../utils/isEqual';
import { Block } from '../core';
import store, { StoreEvents } from '../core/Store';

type Indexed<T = unknown> = {
  [key in string]: T;
};

function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function fn(Component: typeof Block) {
    return class extends Component {
      constructor(props: Record<string, unknown> | undefined) {
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        });
      }
    };
  };
}

export default connect;
