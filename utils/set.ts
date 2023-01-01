type Indexed<T = unknown> = {
  [key in string]: T;
};

function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function set(
  object: Indexed,
  path: string,
  value: unknown,
): Indexed | unknown {
  if (!isObject(object)) {
    return object;
  }
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }
  const arr = path.split('.');
  if (path.trim().length === 0) {
    return object;
  }
  if (arr.length === 1) {
    // eslint-disable-next-line no-param-reassign
    object[arr[0]] = value;
  }
  if (arr.length > 1) {
    let obj = object;
    arr.forEach((item, index) => {
      if (index !== arr.length - 1) {
        obj[item] = {};
        obj = obj[item] as Indexed;
      } else {
        obj[item] = value;
      }
    });
  }
  return object;
}

export default set;
