<template>
  <div class="sticky-box">
    <div class="sticky-header">
      <h3>{{ noteID }}</h3>
    </div>
    <div class="sticky-body" @click="handleSelectNote(noteID)">
      <p>{{ stickyContent }}</p>
    </div>
    <div class="sticky-footer">
      <div class="unpin-btn">
        <IconPushpinOff @click="handleUnpinStickies(noteID)"></IconPushpinOff>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppNotesStore } from '@/stores/appNotes';
import { storeToRefs } from 'pinia';
import IconPushpinOff from '@/components/icons/IconPushpinOff.vue';
import { computed } from 'vue';

const appNotesStore = useAppNotesStore();
const { stickyList } = storeToRefs(appNotesStore);

const props = defineProps({
  noteID: String
});

const stickyContent = computed(() => {
  const sticky = stickyList.value.find(item => item.stickyID === props.noteID);
  if (sticky) {
    return sticky.content;
  } else {
    return '';
  }
});

const handleSelectNote = id => {
  appNotesStore.toggleNotes(true);
  appNotesStore.setNoteEditorContent(id);
};

const handleUnpinStickies = id => {
  const sticky = stickyList.value.find(item => item.stickyID === id);
  sticky.unpin();
  appNotesStore.unpinNote(id);
};
</script>

<script>
export default {
  name: 'AstraStickies'
};
</script>

<style lang="scss" scoped>
.sticky-box {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #ffffb7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sticky-header {
  position: relative;
  width: 100%;
  height: 30px;
  padding: 5px 10px;
}

.sticky-body {
  flex: 1;
  width: 100%;
  padding: 0 10px;
  overflow-y: auto;
  overflow-x: hidden;
}

.sticky-body::-webkit-scrollbar-track {
  background-color: #ffffb7;
}

.sticky-body::-webkit-scrollbar {
  width: 6px;
}

.sticky-body::-webkit-scrollbar-thumb {
  background-color: #ffd52e;
}

.sticky-body p {
  white-space: pre-line;
}

.sticky-footer {
  position: relative;
  width: 100%;
  height: 30px;
  padding: 5px 10px;
  display: flex;
  flex-direction: row-reverse;
}

.unpin-btn {
  position: relative;
  font-size: 15px;
  padding: 0 10px;
  cursor: pointer;
}
</style>
