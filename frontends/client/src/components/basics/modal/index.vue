<template>
  <Transition name="fade">
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
        <div
          class="modal-content"
          :class="{ 'modal-content-multi': props.multiContent }"
        >
          <div class="modal-content-embedded" v-if="iframeUrl">
            <iframe
              :src="iframeUrl"
              class="modal-embedded-iframe"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            ></iframe>
          </div>
          <div class="modal-form-wrapper" v-if="props.hasForm">
            <AstraInput nestedInput v-model="nestedInputInfo"></AstraInput>
          </div>
          <div
            class="modal-card-wrapper"
            v-if="props.hasCard && $slots.modalcard"
          >
            <slot name="modalcard"></slot>
          </div>
          <slot v-else></slot>
        </div>
        <div
          class="modal-footer"
          v-if="$slots.footer && (props.hasForm || props.hasCard)"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
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
  hasForm: {
    type: Boolean,
    default: false
  },
  hasCard: {
    type: Boolean,
    default: false
  },
  multiContent: {
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
  width: 550px;
  line-height: 1.5715;
  text-align: left;
  background-color: #fff;
  border-radius: 13px;
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
  height: 39px;
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
  text-overflow: ellipsis;
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
  height: calc(100% - 39px);
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

.modal-card-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}

.modal-content-multi {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.modal-content-multi .modal-form-wrapper {
  flex: 1;
}

.modal-content-multi .modal-card-wrapper {
  flex: 1;
}

@media (max-width: 600px) {
  .modal {
    width: 85%;
  }

  .modal-fullscreen {
    width: 100%;
  }

  .modal-header-mid {
    font-size: 1.1rem;
  }

  .modal-content {
    padding: 26px 15px;
  }

  .modal-content-multi {
    flex-direction: column;
  }

  .modal-content-multi .modal-form-wrapper {
    margin-bottom: 10px;
  }

  .modal-content-multi .modal-card-wrapper {
    margin-top: 10px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
