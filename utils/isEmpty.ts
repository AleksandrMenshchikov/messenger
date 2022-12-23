function isEmpty(value: string | unknown[] | null) {
  if (
    (typeof value === 'string' && value.length > 0)
    || (typeof value === 'object' && value !== null)
  ) {
    return false;
  }
  return true;
}

export default isEmpty;
