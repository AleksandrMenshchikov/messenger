function isObject(object: any) {
  return object != null && typeof object === 'object';
}

function isEqual(a: object, b: object): boolean {
  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);
  if (keys1.length !== keys2.length) {
    return false;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys1) {
    const val1 = a[key as keyof object];
    const val2 = b[key as keyof object];
    const areObjects = isObject(a[key as keyof object]) && isObject(b[key as keyof object]);
    if ((areObjects && !isEqual(val1, val2)) || (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
}

export default isEqual;
