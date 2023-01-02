/* eslint-disable no-restricted-syntax */
type StringIndexed = Record<string, any>;

function isPlainObject(value: unknown) {
  return (
    typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]'
  );
}

function isPrimitive(value: unknown): boolean {
  if (
    typeof value === 'boolean'
    || typeof value === 'string'
    || typeof value === 'number'
  ) {
    return true;
  }
  return false;
}
function queryStringify(data: StringIndexed): string | never {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }
  const arr = [];
  for (const item in data) {
    if (isPrimitive(data[item])) {
      arr.push(`${item}=${data[item]}`);
    } else if (Array.isArray(data[item])) {
      data[item].forEach((elem: unknown, index: number) => {
        if (isPrimitive(elem)) {
          arr.push(`${item}[${index}]=${elem}`);
        } else if (isPlainObject(elem)) {
          let obj: any = elem;
          while (!isPrimitive(obj)) {
            // eslint-disable-next-line guard-for-in
            for (const item in obj as object) {
              obj = obj[item];
            }
          }
          arr.push(`${item}[${index}]=${obj}`);
        }
      });
    } else if (isPlainObject(data[item])) {
      let str = '';
      let obj = data[item];
      while (!isPrimitive(obj)) {
        // eslint-disable-next-line guard-for-in
        for (const item in obj) {
          str += `[${item}]`;
          obj = obj[item];
        }
      }
      arr.push(`${item}${str}=${obj}`);
    }
  }
  return arr.join('&');
}

export default queryStringify;
