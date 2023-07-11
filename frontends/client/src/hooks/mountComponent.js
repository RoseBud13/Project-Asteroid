import { createApp } from 'vue';

export function useMountComponent(rootComp, options, cls, style, parentComp) {
  const app = createApp(rootComp, options);
  const containerNode = document.createElement('div');
  const wrapper = parentComp || document.body;
  if (cls && typeof cls === 'string') {
    containerNode.classList.add(cls);
  }
  if (style) {
    containerNode.style.top = style.top + 'px';
    containerNode.style.left = style.left + 'px';
  }
  if (options.noteID) {
    containerNode.id = options.noteID;
  }
  wrapper.appendChild(containerNode);
  return {
    instance: app.mount(containerNode),
    unmount() {
      app.unmount();
      wrapper.removeChild(containerNode);
    }
  };
}
