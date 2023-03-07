<template>
  <div class="astra-dropdown">
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
import { onMounted, ref } from 'vue';

const dropdownTrigger = ref(null);
const triggerHeight = ref();

onMounted(() => {
  // console.log(dropdownTrigger.value.offsetHeight);
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
