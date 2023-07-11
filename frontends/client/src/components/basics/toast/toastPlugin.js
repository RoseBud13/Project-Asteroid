import AstraToast from './index.vue';
import { useMountComponent } from '@/hooks/mountComponent';
import { nextTick } from 'vue';
import { useToastStore } from '@/stores/toast';
import { storeToRefs } from 'pinia';
import { generateUID } from '@/utils/tool';
import { useAutoLayout } from '@/utils/elements';

const toastPlugin = (message, type, duration, top) => {
  const toastStore = useToastStore();
  const { toastList } = storeToRefs(toastStore);

  const toastID = 'toast-' + generateUID(3);

  toastStore.addToastList(toastID);

  const target = {
    x: 100,
    y: 35,
    amount: toastList.value.length
  };

  const targetIndex = toastList.value.length - 1;

  const positionInfo = useAutoLayout(target);

  const targetTop = positionInfo[targetIndex].y;

  const options = {
    msg: message,
    toastType: type || 'normal',
    topOffset: top || targetTop + 'px'
  };

  const timer = typeof duration === 'number' ? duration : 2000;

  const { instance, unmount } = useMountComponent(AstraToast, options);

  nextTick(() => {
    setTimeout(() => {
      unmount();
      toastStore.removeToastList(toastID);
    }, timer);
  });

  return instance;
};

export default {
  install: app => {
    app.config.globalProperties.$toast = toastPlugin;
    app.provide('toast', toastPlugin);
  }
};
