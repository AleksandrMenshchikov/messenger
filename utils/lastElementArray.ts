function last(list: string | any[]) {
  if (!Array.isArray(list) || !list.length) {
    return undefined;
  }
  return list[list.length - 1];
}
