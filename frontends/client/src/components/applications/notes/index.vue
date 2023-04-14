<template>
  <div
    class="astra-notes-container"
    :style="{
      top: `${originPosition.y}px`,
      left: `${originPosition.x}px`,
      transform: `translate(${elementOffset.x}px, ${elementOffset.y}px)`
    }"
  >
    <div ref="notesHeader" class="notes-header"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';

const notesHeader = ref(null);

const originPosition = reactive({
  x: 50,
  y: 200
});

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
};

onMounted(() => {
  notesHeader.value.addEventListener('mousedown', handleMousedown, true);
});

onBeforeUnmount(() => {
  notesHeader.value.removeEventListener('mousedown', handleMousedown, true);
});
</script>

<script>
export default {
  name: 'AstraNotes'
};
</script>

<style lang="scss" scoped>
.astra-notes-container {
  position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  width: 800px;
  height: 500px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  z-index: 1;
}

.notes-header {
  position: relative;
  width: 100%;
  height: 40px;
}
</style>
