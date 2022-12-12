function first(list: any[]): any {
  if (!Array.isArray(list) || !list.length) {
    return undefined;
  }
  return list[0];
}
