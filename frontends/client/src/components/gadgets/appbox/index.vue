<template>
  <div class="app-box-container" :class="{ 'add-new': props.addNew }">
    <slot></slot>
    <div
      class="add-btn-wrapper"
      :class="{ 'add-btn-flex': props.addBtnFlex }"
      v-if="props.addShow"
    >
      <AstraButton
        size="large"
        shape="circle"
        style="font-size: 23px"
        @click="handleOpenAddWidgetApp"
        :title="$t('appbox.action.addNewWidgetApp')"
        >+</AstraButton
      >
    </div>
  </div>
</template>

<script setup>
import AstraButton from '@/components/basics/button/index.vue';
import { useWidgetboxStore } from '@/stores/widgetbox';
import { useModalStore } from '@/stores/modal';
import { useInputStore } from '@/stores/input';
import { storeToRefs } from 'pinia';
import { watch, ref } from 'vue';

const widgetboxStore = useWidgetboxStore();
const modalStore = useModalStore();
const { hasForm, isConfirmed } = storeToRefs(modalStore);
const inputStore = useInputStore();
const { nestedInputInfo } = storeToRefs(inputStore);

const newWidgetApp = ref({});

const props = defineProps({
  addNew: Boolean,
  addShow: Boolean,
  addBtnFlex: Boolean
});

const handleOpenAddWidgetApp = () => {
  let widgetAppsInputData = [
    {
      isPswd: false,
      type: 'text',
      placeholder: 'appbox.input.placeholder.title',
      modelValue: ''
    },
    {
      isPswd: false,
      type: 'text',
      placeholder: 'appbox.input.placeholder.url',
      modelValue: '',
      prepend: 'https://'
    }
  ];
  inputStore.setNestedInfo(widgetAppsInputData);
  modalStore.openModal('appbox.action.addNewWidgetApp', true, true, true);
};

watch(
  nestedInputInfo,
  () => {
    if (nestedInputInfo.value.length === 2) {
      newWidgetApp.value = {
        title: nestedInputInfo.value[0]['modelValue'],
        url:
          nestedInputInfo.value[1]['modelValue'].startsWith('https://') ||
          nestedInputInfo.value[1]['modelValue'].startsWith('http://')
            ? nestedInputInfo.value[1]['modelValue']
            : 'https://' + nestedInputInfo.value[1]['modelValue']
      };
    }
  },
  { deep: true }
);

watch(hasForm, () => {
  if (!hasForm.value) {
    inputStore.clearNestedInfo();
  }
});

watch(isConfirmed, () => {
  if (isConfirmed.value && newWidgetApp.value.title && newWidgetApp.value.url) {
    widgetboxStore.addWidgetApp(newWidgetApp.value);
  }
});
</script>

<script>
export default {
  name: 'AstraAppBox'
};
</script>

<style lang="scss" scoped>
.app-box-container {
  position: relative;
  width: 80%;
  height: 40%;
  max-width: 600px;
  margin: 20px 0;
  padding: 0 60px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

.add-new {
  align-items: center;
  font-size: 25px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.add-new:hover {
  opacity: 1;
}

.add-btn-wrapper {
  position: absolute;
  bottom: 0;
  height: 50%;
  width: 20%;
  max-width: 100px;
  background-color: transparent;
  display: none;
  justify-content: center;
  align-items: center;
  opacity: 0;
}

.app-box-container:hover .add-btn-wrapper {
  opacity: 1;
  display: flex;
}

.add-new .add-btn-wrapper {
  opacity: 1;
  display: flex;
}

.add-btn-flex {
  position: relative;
}

@media (max-width: 800px) {
  .app-box-container {
    justify-content: space-around;
  }
}

@media (max-width: 600px) {
  .app-box-container {
    padding: 0;
    width: 100%;
  }
}
</style>
