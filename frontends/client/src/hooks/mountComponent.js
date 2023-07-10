import { createApp } from 'vue';

export function useMountComponent(rootComp, options, cls, style) {
  const app = createApp(rootComp, options);
  const containerNode = document.createElement('div');
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
  document.body.appendChild(containerNode);
  return {
    instance: app.mount(containerNode),
    unmount() {
      app.unmount();
      document.body.removeChild(containerNode);
    }
  };
}
