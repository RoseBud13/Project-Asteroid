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
        @click="handlePinStickies(noteID)"
      >
        <IconPushpin></IconPushpin>
      </AstraButton>
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
import IconPushpin from '@/components/icons/IconPushpin.vue';
import { useAppNotesStore } from '@/stores/appNotes';
import { storeToRefs } from 'pinia';
import { computed, inject } from 'vue';
import { useAutoLayout } from '@/utils/elements';

defineProps({
  noteID: String
});

const emit = defineEmits(['click']);

const pinStickies = inject('stickies');

const handleClick = ev => {
  emit('click', ev);
};

const appNotesStore = useAppNotesStore();
const { noteCardColorPreset, stickyList } = storeToRefs(appNotesStore);

const noteCardColor = computed(() => {
  let color =
    noteCardColorPreset.value[
      Math.floor(Math.random() * noteCardColorPreset.value.length)
    ];
  return 'background-color:' + color;
});

const handlePinStickies = id => {
  const content = appNotesStore.pinNote(id);
  if (content) {
    let target = {
      x: 260,
      y: 200,
      amount: stickyList.value.length + 1
    };
    const positionInfo = useAutoLayout(target);
    const sticky = pinStickies(id, positionInfo[stickyList.value.length]);
    sticky.instance;
    appNotesStore.updateStickyList(
      id,
      content,
      sticky.unmount,
      positionInfo[stickyList.value.length]
    );
  }
};
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}

@media (max-width: 700px) {
  .notes-card-wrapper {
    cursor: none;
  }
}
</style>
