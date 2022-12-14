type THandler = (oldProps?: unknown, newProps?: unknown) => unknown

class EventBus {
  listeners: {[x: string]: THandler[]};

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: THandler) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: THandler) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, oldProps?: unknown, newProps?: unknown) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(oldProps, newProps);
    });
  }
}

export default EventBus;
