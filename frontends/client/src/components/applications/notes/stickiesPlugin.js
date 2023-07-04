import AstraStickies from './Stickies.vue';
import { useMountComponent } from '@/hooks/mountComponent';

const stickiesPlugin = (id, content) => {
  const options = {
    noteID: id,
    noteContent: content
  };

  const cls = 'stickies-wrapper';

  const { instance, unmount } = useMountComponent(AstraStickies, options, cls);

  return {
    instance,
    unmount
  };
};

export default {
  install: app => {
    app.config.globalProperties.$stickies = stickiesPlugin;
    app.provide('stickies', stickiesPlugin);
  }
};
