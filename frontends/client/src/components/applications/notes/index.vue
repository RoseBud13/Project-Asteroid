<template>
  <div ref="notes" class="astra-notes-container" :style="style">
    <div ref="notesHeader" class="notes-header">
      <Navbar position="absolute" size="containerWidth">
        <template #left>
          <AstraButton
            type="text"
            :style="{
              'font-size': '23px'
            }"
            @click="appNotesStore.addNewNote()"
          >
            <IconEdit></IconEdit>
          </AstraButton>
        </template>
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
      <div class="notes-timeline-wrapper">
        <ol class="notes-timeline">
          <li
            v-for="datedNotes in formatedNoteList"
            :key="datedNotes.date"
            class="notes-timeline-date-list"
          >
            <span class="notes-timeline-date">{{ datedNotes.date }}</span>
            <ol>
              <li
                v-for="note in datedNotes.notes"
                :key="note.id"
                class="notes-timeline-item"
                :class="[
                  note.id === selectedNoteID ? 'notes-item-selected' : ''
                ]"
              >
                <span class="notes-timeline-time">{{ note.updatedAt }}</span>
                <NotesCard
                  :noteID="note.id"
                  @click="appNotesStore.setNoteEditorContent(note.id)"
                >
                  <template #text>
                    {{ truncate(note.content, 150) }}
                  </template>
                </NotesCard>
              </li>
            </ol>
          </li>
        </ol>
      </div>
      <div class="notes-editor-wrapper">
        <div class="notes-editor">
          <textarea
            v-model="editorContent"
            @input="handleNoteEditor()"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/basics/navbar/index.vue';
import AstraButton from '@/components/basics/button/index.vue';
import NotesCard from './NotesCard.vue';
import IconFullscreen from '@/components/icons/IconFullscreen.vue';
import IconFullscreenExit from '@/components/icons/IconFullscreenExit.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import { useDraggable } from '@/utils/elements';
import { Local } from '@/utils/storage';
import { parseTime } from '@/utils/date';
import { truncate } from '@/utils/tool';
import { useAppNotesStore } from '@/stores/appNotes';
import { storeToRefs } from 'pinia';

const appNotesStore = useAppNotesStore();
const { enlarged, noteList, editorContent, selectedNoteID } =
  storeToRefs(appNotesStore);

const notes = ref(null);
const notesHeader = ref(null);
const notesPosition = Local.get('notes-position');

const { style, handleMousedown } = useDraggable(notesHeader, {
  initPosition: notesPosition,
  savePosition: true
});

const handleNoteEditor = () => {
  appNotesStore.updateNoteContent(selectedNoteID.value, editorContent.value);
};

const formatedNoteList = computed(() => {
  let unformated = noteList.value;
  let dates = [];
  let formated = [];
  unformated.sort((a, b) => {
    if (a['updateTime'] < b['updateTime']) {
      return 1;
    }
    if (a['updateTime'] > b['updateTime']) {
      return -1;
    }
    return 0;
  });
  unformated.forEach(item => {
    let parsed = parseTime(item.updateTime).split(' ');
    item['updateDate'] = parsed[0];
    item['updatedAt'] = parsed[1];
    dates.push(item['updateDate']);
  });
  let uniqDates = [...new Set(dates)];
  let noteListOfTheDay = {};
  uniqDates.forEach(date => {
    noteListOfTheDay['date'] = date;
    noteListOfTheDay['notes'] = [];
    unformated.forEach(item => {
      if (item.updateDate === date) {
        noteListOfTheDay['notes'].push(item);
      }
    });
    formated.push(JSON.parse(JSON.stringify(noteListOfTheDay)));
  });
  return formated;
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
  background-color: #d8f3dc;
  border-radius: 15px 15px 0 0;
}

.notes-main {
  position: relative;
  width: 100%;
  height: calc(100% - 50px);
  border-radius: inherit;
  display: flex;
}

.notes-timeline-wrapper {
  flex: 1;
  overflow: auto;
  max-width: 400px;
}

.notes-timeline-wrapper::-webkit-scrollbar {
  display: none;
}

.notes-timeline {
  padding: 130px 0 20px;
  min-height: 100%;
  height: fit-content;
}

.notes-timeline:before {
  content: '';
  width: 3px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 5px;
  background-color: #52b69a;
  border-radius: 50%;
}

.notes-timeline-date-list {
  position: relative;
  margin-bottom: 110px;
}

.notes-timeline-date {
  position: absolute;
  top: -45px;
  left: 12px;
  font-size: 17px;
  font-weight: bolder;
  font-family: lxgw wenkai, sans-serif;
}

.notes-timeline-item {
  position: relative;
  margin-bottom: 40px;
}

.notes-timeline-item:before {
  content: '';
  width: 13px;
  height: 13px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  background-color: #52b69a;
}

.notes-item-selected:before {
  content: '';
  width: 13px;
  height: 13px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  background-color: #bc4749;
}

.notes-timeline-time {
  position: absolute;
  top: -7px;
  left: 12px;
  font-size: 13px;
}

.notes-editor-wrapper {
  flex: 2;
}

.notes-editor {
  padding: 50px;
  font-size: 18px;
  font-family: lxgw wenkai, sans-serif;
  height: 100%;
}

.notes-editor textarea {
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
