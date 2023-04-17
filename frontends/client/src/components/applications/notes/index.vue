<template>
  <div class="astra-notes-container" :style="style">
    <div ref="notesHeader" class="notes-header">
      <Navbar size="containerWidth">
        <template #right>
          <AstraButton
            type="text"
            :style="{
              'font-size': '20px'
            }"
          >
            <IconFullscreen></IconFullscreen>
            <IconFullscreenExit></IconFullscreenExit>
          </AstraButton>
        </template>
      </Navbar>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useDraggable } from '@/utils/elements';
import { Local } from '@/utils/storage';
import Navbar from '@/components/basics/navbar/index.vue';
import AstraButton from '@/components/basics/button/index.vue';
import IconFullscreen from '@/components/icons/IconFullscreen.vue';
import IconFullscreenExit from '@/components/icons/IconFullscreenExit.vue';

const notesHeader = ref(null);
const notesPosition = Local.get('notes-position');

const { style, handleMousedown } = useDraggable(notesHeader, {
  initPosition: notesPosition,
  savePosition: true
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
  position: fixed;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  width: 1100px;
  height: 750px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  z-index: 1;
}

.notes-header {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: var(--color-neutral-1);
  border-radius: 15px 15px 0 0;
}

// .notes-header:hover {
//   background-color: var(--color-neutral-1);
// }

@media (max-width: 1100px) {
  .astra-notes-container {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .notes-header {
    border-radius: 0;
  }
}
</style>
