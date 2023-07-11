<template>
  <div class="side-appbox-wrapper" :class="cls">
    <div class="side-appbox-app-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useSideAppBoxStore } from '@/stores/sideAppBox';

const sideAppBoxStore = useSideAppBoxStore();
const { showSideAppBox } = storeToRefs(sideAppBoxStore);

const props = defineProps({
  position: {
    type: String,
    default: 'left',
    validator(value) {
      return ['left', 'right'].includes(value);
    }
  }
});

const cls = computed(() => {
  if (
    showSideAppBox.value === true &&
    (props.position === 'left' || !props.position)
  ) {
    return 'side-appbox-left-show';
  } else if (showSideAppBox.value === true && props.position === 'right') {
    return 'side-appbox-right-show';
  } else {
    return `side-appbox-${props.position ? props.position : 'left'}`;
  }
});
</script>

<style lang="scss" scoped>
.side-appbox-wrapper {
  position: absolute;
  height: 90%;
  max-height: 580px;
  width: 80px;
  margin: 0 10px 0 10px;
  background-color: #fff;
  border-radius: 25px;
  transition: all 0.3s ease-in-out;
  z-index: 10;
}

.side-appbox-left {
  left: -200%;
}

.side-appbox-right {
  right: -200%;
}

.side-appbox-left-show {
  left: 0;
}

.side-appbox-right-show {
  right: 0;
}

.side-appbox-app-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 10px;
  overflow: auto;
}

.side-appbox-app-container :deep(> *) {
  margin-bottom: 20px;
}
</style>
