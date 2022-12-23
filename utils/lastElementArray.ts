function last(list: string | unknown[]) {
  if (!Array.isArray(list) || !list.length) {
    return undefined;
  }
  return list[list.length - 1];
}

export default last;
