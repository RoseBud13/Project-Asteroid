<template>
  <div class="astra-dropdown" :class="cls">
    <div class="dropdown-trigger-wrapper" ref="dropdownTrigger">
      <slot name="trigger"></slot>
    </div>
    <div
      class="astra-dropdown-container"
      :style="{ top: triggerHeight + 'px' }"
    >
      <ul class="astra-dropdown-menu">
        <slot name="content"></slot>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';

const props = defineProps({
  leftEdge: {
    type: Boolean,
    default: false
  },
  rightEdge: {
    type: Boolean,
    default: false
  }
});

const dropdownTrigger = ref(null);
const triggerHeight = ref();

const cls = computed(() => {
  if (props.leftEdge) {
    return 'astra-dropdown-left';
  } else if (props.rightEdge) {
    return 'astra-dropdown-right';
  } else {
    return '';
  }
});

onMounted(() => {
  triggerHeight.value = dropdownTrigger.value.offsetHeight + 5;
});
</script>

<script>
export default {
  name: 'AstraDropdown'
};
</script>

<style lang="scss" scoped>
.astra-dropdown {
  position: relative;
}

.astra-dropdown:hover .astra-dropdown-container {
  opacity: 1;
  visibility: visible;
}

.astra-dropdown-container {
  position: absolute;
  top: 0;
  right: 50%;
  opacity: 0;
  visibility: hidden;
  transform: translateX(50%);
  transition: opacity 0.25s, visibility 0.25s, transform 0.25s;
  z-index: 1;
}

.astra-dropdown-left .astra-dropdown-container {
  left: 0;
  transform: translateX(0);
}

.astra-dropdown-right .astra-dropdown-container {
  right: 0;
  transform: translateX(0);
}

.astra-dropdown-menu {
  margin-top: 0;
  margin-bottom: 0;
  list-style: none;
  border-radius: 8px;
  padding: 12px 0;
  min-width: 100px;
  background: var(--vt-c-bg);
  box-shadow: var(--vt-shadow-3);
  transition: background-color 0.5s;
}
</style>
