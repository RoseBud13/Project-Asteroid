<template>
  <div class="sticky-box">
    <div class="sticky-header" ref="stickyHeader" @click="handleMoveSticky">
      <!-- <h3>{{ stickyPosition }}</h3> -->
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
import IconPushpinOff from '@/components/icons/IconPushpinOff.vue';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppNotesStore } from '@/stores/appNotes';
import { useDraggable } from '@/utils/elements';

const stickyHeader = ref(null);

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

const stickyPosition = computed(() => {
  const sticky = stickyList.value.find(item => item.stickyID === props.noteID);
  if (sticky) {
    return sticky.position;
  } else {
    return 'no stikcy found';
  }
});

setTimeout(() => {
  useDraggable(
    stickyHeader,
    {
      initPosition: stickyPosition.value,
      savePosition: false
    },
    document.getElementById(props.noteID)
  );
}, 200);

const handleMoveSticky = () => {
  appNotesStore.moveSticky(props.noteID, stickyPosition.value);
};

const handleSelectNote = id => {
  if (window.getSelection().type !== 'Range') {
    appNotesStore.toggleNotes(true);
    appNotesStore.setNoteEditorContent(id);
  }
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
  cursor: grab;
}

.sticky-header:active {
  cursor: grabbing;
}

.sticky-body {
  flex: 1;
  width: 100%;
  padding: 0 10px;
  overflow-y: auto;
  overflow-x: hidden;
  user-select: text;
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
