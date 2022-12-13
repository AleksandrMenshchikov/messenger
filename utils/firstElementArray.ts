// eslint-disable-next-line @typescript-eslint/no-unused-vars
function first(list: unknown[]): unknown {
  if (!Array.isArray(list) || !list.length) {
    return undefined;
  }
  return list[0];
}
