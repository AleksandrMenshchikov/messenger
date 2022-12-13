function first(list: unknown[]): unknown {
  if (!Array.isArray(list) || !list.length) {
    return undefined;
  }
  return list[0];
}

export default first;
