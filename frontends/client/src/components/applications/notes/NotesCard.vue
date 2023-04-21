<template>
  <div class="notes-card-wrapper" :style="noteCardColor">
    <div class="notes-card-text-wrapper" @click="handleClick">
      <slot name="text"></slot>
    </div>
    <div class="notes-card-actions-wrapper">
      <AstraButton
        type="text"
        :style="{
          'font-size': '15px',
          opacity: 0.3
        }"
        @click="appNotesStore.deleteNote(noteID)"
      >
        <IconDelete></IconDelete>
      </AstraButton>
    </div>
  </div>
</template>

<script setup>
import AstraButton from '@/components/basics/button/index.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import { useAppNotesStore } from '@/stores/appNotes';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

defineProps({
  noteID: String
});

const emit = defineEmits(['click']);

const handleClick = ev => {
  emit('click', ev);
};

const appNotesStore = useAppNotesStore();
const { noteCardColorPreset } = storeToRefs(appNotesStore);

const noteCardColor = computed(() => {
  let color =
    noteCardColorPreset.value[
      Math.floor(Math.random() * noteCardColorPreset.value.length)
    ];
  return 'background-color:' + color;
});
</script>

<style lang="scss" scoped>
.notes-card-wrapper {
  position: relative;
  margin-left: 80px;
  width: calc(100% - 100px);
  max-width: 350px;
  min-height: 100px;
  border-radius: 30px;
  background-color: #dde7c7;
  cursor: pointer;
}

.notes-card-text-wrapper {
  padding: 15px 15px 40px 15px;
}

.notes-card-actions-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-items: center;
  align-items: center;
}

@media (max-width: 700px) {
  .notes-card-wrapper {
    cursor: none;
  }
}
</style>
