type Indexed<T = unknown> = {
  [key in string]: T;
};

function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  if (isObject(lhs) && isObject(rhs)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in rhs) {
      if (isObject(rhs[key])) {
        if (!lhs[key]) Object.assign(lhs, { [key]: {} });
        merge(lhs[key] as Indexed, rhs[key] as Indexed);
      } else {
        Object.assign(lhs, { [key]: rhs[key] });
      }
    }
  }

  return lhs;
}

export default merge;
