<template>
  <div class="notes-card-wrapper">
    <div class="notes-card-text-wrapper">
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

defineProps({
  noteID: String
});

const appNotesStore = useAppNotesStore();
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
</style>
