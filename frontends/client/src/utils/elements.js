import { reactive, computed } from 'vue';
import { Local } from './storage';

export function useDraggable(targetEle, options) {
  const { initPosition, savePosition } = options || {};

  const originPosition = reactive(initPosition || { x: 0, y: 0 });

  const elementOffset = reactive({
    x: 0,
    y: 0
  });

  const mousedownOffset = reactive({
    x: 0,
    y: 0
  });

  const updatePosition = () => {
    originPosition.x = originPosition.x + elementOffset.x;
    originPosition.y = originPosition.y + elementOffset.y;
    elementOffset.x = 0;
    elementOffset.y = 0;
  };

  const handleMousedown = event => {
    event.stopPropagation();
    mousedownOffset.x = event.clientX - originPosition.x;
    mousedownOffset.y = event.clientY - originPosition.y;
    document.addEventListener('mousemove', handleMousemove, true);
    document.addEventListener('mouseup', handleMouseup, true);
  };

  const handleMousemove = event => {
    event.stopPropagation();
    elementOffset.x = event.clientX - originPosition.x - mousedownOffset.x;
    elementOffset.y = event.clientY - originPosition.y - mousedownOffset.y;
  };

  const handleMouseup = event => {
    event.stopPropagation();
    document.removeEventListener('mousemove', handleMousemove, true);
    document.removeEventListener('mouseup', handleMouseup, true);
    updatePosition();
    if (savePosition) {
      Local.set(targetEle.value.className.split('-')[0] + '-position', {
        x: originPosition.x,
        y: originPosition.y
      });
    }
  };

  setTimeout(() => {
    targetEle.value.addEventListener('mousedown', handleMousedown, true);
  }, 800);

  return {
    style: computed(
      () =>
        `top:${originPosition.y}px;left:${originPosition.x}px;transform:translate(${elementOffset.x}px,${elementOffset.y}px)`
    ),
    handleMousedown
  };
}
