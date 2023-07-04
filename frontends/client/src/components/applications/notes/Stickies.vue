<template>
  <div class="stickies">
    <h3>{{ noteID }}</h3>
    <p>{{ noteContent }}</p>
    <div @click="handleUnpinStickies(noteID)">X</div>
  </div>
</template>

<script setup>
import { useAppNotesStore } from '@/stores/appNotes';
import { storeToRefs } from 'pinia';

const appNotesStore = useAppNotesStore();
const { stickyList } = storeToRefs(appNotesStore);

defineProps({
  noteID: String,
  noteContent: String
});

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

<style lang="scss">
.stickies-wrapper {
  position: absolute;
  top: 100px;
  left: 100px;
  width: 200px;
  min-height: 100px;
}

.stickies {
  width: 100%;
  height: 100%;
  background-color: #fefefe;
}
</style>
