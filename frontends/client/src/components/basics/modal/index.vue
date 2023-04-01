<template>
  <div class="modal-container" v-if="props.visible && showModal">
    <div class="modal-mask" @click="handleCancel"></div>
    <div class="modal" :class="cls">
      <div class="modal-header">
        <div class="modal-header-left">
          <slot name="left"></slot>
        </div>
        <div class="modal-header-mid">
          <slot name="title"></slot>
        </div>
        <div class="modal-header-right">
          <slot name="right"></slot>
        </div>
      </div>
      <div class="modal-content">
        <div class="modal-content-embedded" v-if="iframeUrl">
          <iframe :src="iframeUrl" class="modal-embedded-iframe"></iframe>
        </div>
        <div class="modal-form-wrapper" v-else-if="props.showForm">
          <AstraInput nestedInput v-model="nestedInputInfo"></AstraInput>
        </div>
        <slot v-else></slot>
      </div>
      <div class="modal-footer" v-if="$slots.footer && props.showForm">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import AstraInput from '@/components/basics/input/index.vue';
import { ref, watch, computed } from 'vue';
import { isUrl } from '@/utils/is';
import { storeToRefs } from 'pinia';
import { useInputStore } from '@/stores/input';

const inputStore = useInputStore();
const { nestedInputInfo } = storeToRefs(inputStore);

const showModal = ref(false);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  embeddedUrl: String,
  showForm: {
    type: Boolean,
    default: false
  }
});

const cls = computed(() => {
  return props.fullscreen ? 'modal-fullscreen' : '';
});

const iframeUrl = computed(() => {
  return isUrl(props.embeddedUrl) ? props.embeddedUrl : '';
});

watch(props, () => {
  if (props.visible) {
    showModal.value = true;
  } else if (!props.visible) {
    showModal.value = false;
  }
});

const emit = defineEmits(['ok', 'cancel']);

const handleCancel = () => {
  showModal.value = false;
  emit('cancel');
};
</script>

<script>
export default {
  name: 'AstraModal'
};
</script>

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.modal-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--color-mask-bg);
}

.modal {
  position: relative;
  width: 520px;
  line-height: 1.5715;
  text-align: left;
  background-color: #fff;
  border-radius: var(--border-radius-medium);
}

.modal-fullscreen {
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.modal-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 38px;
  border-bottom: 1px solid var(--color-neutral-3);
}

.modal-header-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  flex: 1;
  font-weight: 600;
  font-size: 18px;
}

.modal-header-mid {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 2;
  font-weight: 500;
  font-size: 17px;
}

.modal-header-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  flex: 1;
  font-weight: 600;
  font-size: 18px;
}

.modal-content {
  position: relative;
  padding: 26px 20px;
  overflow: auto;
  color: var(--color-text-1);
  font-size: 14px;
}

.modal-fullscreen .modal-content {
  width: 100%;
  height: calc(100% - 38px);
  padding: 0;
  overflow: hidden;
}

.modal-content-embedded {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.modal-embedded-iframe {
  flex-grow: 1;
  border: none;
  margin: 0;
  padding: 0;
}

.modal-footer {
  width: 100%;
  padding: 10px 20px;
  text-align: right;
  border-top: 1px solid var(--color-neutral-3);
}

.modal-footer :deep(> *) {
  margin-left: 15px;
}

.modal-fullscreen .modal-footer {
  position: absolute;
  bottom: 0;
  background-color: #fff;
}

.modal-form-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 600px) {
  .modal {
    width: 85%;
  }

  .modal-fullscreen {
    width: 100%;
  }

  .modal-header-mid {
    font-size: 1.5rem;
  }
}
</style>
