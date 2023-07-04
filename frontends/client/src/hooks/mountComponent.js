import { createApp } from 'vue';

export function useMountComponent(rootComp, options, cls) {
  const app = createApp(rootComp, options);
  const containerNode = document.createElement('div');
  if (cls && typeof cls === 'string') {
    containerNode.classList.add(cls);
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
