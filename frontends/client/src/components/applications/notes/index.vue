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
    <div class="notes-main">
      <div class="notes-main-timeline-wrapper">
        <ol class="notes-main-timeline">
          <li
            class="notes-timeline-item"
            v-for="note in noteList"
            :key="note.id"
          >
            <span class="notes-timeline-time">{{ note.time }}</span>
            <NotesCard @click="appNotesStore.setNoteEditorContent(note.id)">
              <template #text>
                {{ note.content }}
              </template>
            </NotesCard>
          </li>
        </ol>
      </div>
      <div class="notes-main-content-wrapper">
        <div class="notes-main-content">
          <textarea v-model="noteContent" @input="handleNoteEditor"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/basics/navbar/index.vue';
import AstraButton from '@/components/basics/button/index.vue';
import IconFullscreen from '@/components/icons/IconFullscreen.vue';
import IconFullscreenExit from '@/components/icons/IconFullscreenExit.vue';
import IconClose from '@/components/icons/IconClose.vue';
import NotesCard from './NotesCard.vue';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useDraggable } from '@/utils/elements';
import { Local } from '@/utils/storage';
import { useAppNotesStore } from '@/stores/appNotes';
import { storeToRefs } from 'pinia';

const appNotesStore = useAppNotesStore();
const { enlarged, noteList, noteContent, selectedNoteId } =
  storeToRefs(appNotesStore);

const notes = ref(null);
const notesHeader = ref(null);
const notesPosition = Local.get('notes-position');

const { style, handleMousedown } = useDraggable(notesHeader, {
  initPosition: notesPosition,
  savePosition: true
});

const handleNoteEditor = () => {
  appNotesStore.updateNoteContent(selectedNoteId.value, noteContent.value);
};

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
  appNotesStore.initNotes();
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
@import 'https://cdn.staticfile.org/lxgw-wenkai-webfont/1.6.0/style.css';

.astra-notes-container {
  position: fixed;
  width: 1100px;
  height: 750px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.notes-header {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: #93bcb2;
  border-radius: 15px 15px 0 0;
}

.notes-main {
  position: relative;
  width: 100%;
  height: calc(100% - 50px);
  border-radius: inherit;
  display: flex;
}

.notes-main-timeline-wrapper {
  flex: 1;
  overflow: auto;
  max-width: 400px;
}

.notes-main-timeline-wrapper::-webkit-scrollbar {
  display: none;
}

.notes-main-timeline {
  padding: 100px 0 20px;
}

.notes-main-timeline:before {
  content: '';
  width: 4px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 4px;
  background-color: #93bcb2;
}

.notes-timeline-item {
  position: relative;
  margin-bottom: 50px;
}

.notes-timeline-item:before {
  content: '';
  width: 13px;
  height: 13px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  background-color: rgb(95, 140, 128);
}

.notes-timeline-time {
  position: absolute;
  top: -14px;
  left: 12px;
  font-size: 13px;
}

.notes-main-content-wrapper {
  flex: 2;
}

.notes-main-content {
  padding: 50px;
  font-size: 18px;
  font-family: lxgw wenkai, sans-serif;
  height: 100%;
}

.notes-main-content textarea {
  position: relative;
  display: block;
  resize: none;
  padding: 5px 11px;
  line-height: 1.5;
  width: 100%;
  height: 100%;
  font-size: inherit;
  font-family: inherit;
  border: none;
  outline: none;
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
