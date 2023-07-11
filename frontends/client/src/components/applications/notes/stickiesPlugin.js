import AstraStickies from './Stickies.vue';
import { useMountComponent } from '@/hooks/mountComponent';

const stickiesPlugin = (id, position, parentComp) => {
  const options = {
    noteID: id
  };

  const cls = 'stickies-wrapper';
  const style = { top: position.y, left: position.x };

  const { instance, unmount } = useMountComponent(
    AstraStickies,
    options,
    cls,
    style,
    parentComp
  );

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
