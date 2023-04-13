<template>
  <Transition name="fade">
    <div
      ref="astraToast"
      class="astra-toast-wrapper"
      :class="toastType"
      :style="{ top: topOffset }"
      v-if="show"
    >
      <div class="toast-content-wrapper" v-if="$slots.content">
        <slot name="content"></slot>
      </div>
      <div class="toast-text-wrapper" v-else>{{ msg }}</div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue';

const astraToast = ref(null);

defineProps({
  show: {
    type: Boolean,
    default: true
  },
  topOffset: {
    type: String,
    default: '60px'
  },
  toastType: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['normal', 'success', 'warn', 'error'].includes(value);
    }
  },
  msg: {
    type: String,
    default: '♥ This is a test toast'
  }
});

defineExpose({
  astraToast
});
</script>

<script>
export default {
  name: 'AstraToast'
};
</script>

<style lang="scss" scoped>
.astra-toast-wrapper {
  position: fixed;
  // top: 60px; // default
  left: 50%;
  transform: translateX(-50%);
  min-height: 35px;
  font-size: 15px;
  line-height: 1;
  padding: 10px 15px;
  border-radius: 35px;
  z-index: 1001;
}

.toast-content-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.astra-toast-wrapper.normal {
  background-color: var(--color-neutral-2);
  color: var(--color-text-2);
}

.astra-toast-wrapper.success {
  background-color: var(--color-success-light-2);
  color: var(--color-text-2);
}

.astra-toast-wrapper.warn {
  background-color: var(--color-warning-light-3);
  color: var(--color-text-2);
}

.astra-toast-wrapper.error {
  background-color: var(--color-danger-light-4);
  color: var(--color-text-5);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
