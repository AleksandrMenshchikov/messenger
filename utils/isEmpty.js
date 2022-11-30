function isEmpty(value) {
  if (
    (typeof value === 'string' && value.length > 0) ||
    (typeof value === 'object' && value !== null)
  ) {
    return false;
  }
  return true;
}
