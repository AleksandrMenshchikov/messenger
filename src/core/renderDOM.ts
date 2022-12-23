import Block from './Block';

export default function renderDOM(rootSelector: string, block: Block) {
  const root = document.querySelector(rootSelector);

  if (root) {
    root.innerHTML = '';
    root.append(block.getContent());
  } else {
    throw new Error('Root not found');
  }
}
