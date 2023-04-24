<template>
  <div class="astra-app-wrapper" @click="handleClick" :title="appTitle">
    <div class="astra-app-icon">
      <AstraNotesIcon v-if="icon === 'notes'"></AstraNotesIcon>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AstraNotesIcon = defineAsyncComponent(() =>
  import('@/components/icons/EmojiNote.vue')
);

const emit = defineEmits(['click']);

const handleClick = ev => {
  emit('click', ev);
};

defineProps({
  icon: {
    type: String
  },
  appTitle: String
});
</script>

<style lang="scss" scoped>
.astra-app-wrapper {
  position: relative;
  width: 80%;
  aspect-ratio: 1 / 1;
  min-width: 30px;
  max-width: 70px;
  background-color: #fff;
  border-radius: 20%;
  overflow: hidden;
}

.astra-app-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #93bcb2;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13%;
}

.astra-app-icon :deep(> *) {
  width: 100%;
  height: max-content;
}
</style>
