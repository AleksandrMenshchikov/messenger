function trim(str: string, replacer?: string) {
  if (replacer && replacer.trim().length === 0) {
    return str;
  }
  if (str && replacer) {
    const re = new RegExp(`^[${replacer}]+|[${replacer}]+$`, 'g');
    return str.replace(re, '').trim();
  }
  return str.trim();
}

export default trim;
