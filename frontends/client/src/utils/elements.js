import { reactive, computed } from 'vue';
import { Local } from './storage';

export function useDraggable(targetEle, options, otherEle) {
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
    event.preventDefault();
    event.stopPropagation();
    elementOffset.x = event.clientX - originPosition.x - mousedownOffset.x;
    elementOffset.y = event.clientY - originPosition.y - mousedownOffset.y;
    if (otherEle) {
      otherEle.style = `top:${originPosition.y}px;left:${originPosition.x}px;transform:translate(${elementOffset.x}px,${elementOffset.y}px)`;
    }
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

/**
 * Returns position info for each target item.
 *
 * @param {object} target The width, height and amount of all items, number value.
 * @param {object} options The layout style, container padding and item gap, string and number value.
 * @param {object} container  The width and height of container, number value.
 * @return {object} The x-y position of each item by given order.
 */
export function useAutoLayout(target, options, container) {
  const { layoutStyle, padding, gap } = options || {};
  const style = layoutStyle || 'tile-vertical';
  const safeArea = padding || { x: 100, y: 100 };
  const itemGap = gap || { x: 20, y: 20 };

  const containerBox = container || {
    x: window.innerWidth,
    y: window.innerHeight
  };

  const backgroundSize = {
    x: containerBox.x - safeArea.x * 2,
    y: containerBox.y - safeArea.y * 2
  };
  const itemBox = {
    x: target.x + itemGap.x,
    y: target.y + itemGap.y
  };

  const result = [];

  switch (style) {
    case 'tile-vertical': {
      let verticalAmount = Math.floor(backgroundSize.y / itemBox.y);
      for (let i = 1; i <= target.amount; i++) {
        let columnIndex = Math.ceil(i / verticalAmount);
        let rowIndex =
          i % verticalAmount === 0 ? verticalAmount : i % verticalAmount;
        let positionData = {};
        positionData['x'] = itemBox.x * (columnIndex - 1) + safeArea.x;
        positionData['y'] = itemBox.y * (rowIndex - 1) + safeArea.y;
        result.push(positionData);
      }
      return result;
    }
    case 'tile-horizontal': {
      let horizontalAmount = Math.floor(backgroundSize.x / itemBox.x);
      for (let i = 1; i <= target.amount; i++) {
        let columnIndex =
          i % horizontalAmount === 0 ? horizontalAmount : i % horizontalAmount;
        let rowIndex = Math.ceil(i / horizontalAmount);
        let positionData = {};
        positionData['x'] = itemBox.x * (columnIndex - 1) + safeArea.x;
        positionData['y'] = itemBox.y * (rowIndex - 1) + safeArea.y;
        result.push(positionData);
      }
      return result;
    }
  }
}
