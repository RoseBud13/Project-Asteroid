<template>
  <div ref="notes" class="astra-notes-container" :style="style">
    <div ref="notesHeader" class="notes-header">
      <Navbar position="absolute" size="containerWidth">
        <template #right>
          <AstraButton
            class="notes-enlarge-btn"
            type="text"
            :style="{
              'font-size': '23px'
            }"
          >
            <IconFullscreen
              v-if="!enlarged"
              @click="appNotesStore.toggleEnlarge()"
            ></IconFullscreen>
            <IconFullscreenExit
              v-else
              @click="appNotesStore.toggleEnlarge()"
            ></IconFullscreenExit>
          </AstraButton>
          <AstraButton
            type="text"
            :style="{
              'font-size': '23px'
            }"
            @click="appNotesStore.toggleNotes()"
          >
            <IconClose></IconClose>
          </AstraButton>
        </template>
      </Navbar>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/basics/navbar/index.vue';
import AstraButton from '@/components/basics/button/index.vue';
import IconFullscreen from '@/components/icons/IconFullscreen.vue';
import IconFullscreenExit from '@/components/icons/IconFullscreenExit.vue';
import IconClose from '@/components/icons/IconClose.vue';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useDraggable } from '@/utils/elements';
import { Local } from '@/utils/storage';
import { useAppNotesStore } from '@/stores/appNotes';
import { storeToRefs } from 'pinia';

const appNotesStore = useAppNotesStore();
const { enlarged } = storeToRefs(appNotesStore);

const notes = ref(null);
const notesHeader = ref(null);
const notesPosition = Local.get('notes-position');

const { style, handleMousedown } = useDraggable(notesHeader, {
  initPosition: notesPosition,
  savePosition: true
});

watch(enlarged, () => {
  if (enlarged.value) {
    notes.value.style =
      'top:0px;left:0px;width:100%;height:100%;transition: all 0.5s ease';
    notesHeader.value.removeEventListener('mousedown', handleMousedown, true);
  } else {
    notes.value.style = style.value + ';transition:all 0.5s ease';
    notesHeader.value.addEventListener('mousedown', handleMousedown, true);
  }
});

onMounted(() => {
  if (window.innerWidth < 1100) {
    notes.value.style = 'top:0px;left:0px';
    setTimeout(() => {
      notesHeader.value.removeEventListener('mousedown', handleMousedown, true);
    }, 1000);
  }
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

  .notes-enlarge-btn {
    display: none;
  }
}
</style>
