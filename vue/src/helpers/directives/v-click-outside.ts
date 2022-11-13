import { DirectiveBinding } from 'vue';

export default (el: HTMLElement, binding: DirectiveBinding) => {
  document.addEventListener('click', (e: MouseEvent) => {
    if (e.target instanceof Node) {
      if (!el.contains(e.target)) binding.value();
    }
  });
};
