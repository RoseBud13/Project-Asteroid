<template>
  <div class="app-box-btn-wrapper">
    <div class="app-box-container">
      <slot></slot>
    </div>
    <div class="add-btn-wrapper" v-if="props.addShow">
      <AstraButton
        size="large"
        shape="circle"
        style="font-size: 23px"
        @click="handleOpenAddWidgetApp"
        :title="$t('appbox.action.addNewWidgetApp')"
        class="app-add-btn"
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
import { watch, ref, inject } from 'vue';
import { useI18n } from 'vue-i18n';

const widgetboxStore = useWidgetboxStore();
const modalStore = useModalStore();
const { hasForm, isConfirmed, confirmButtonClicked } = storeToRefs(modalStore);
const inputStore = useInputStore();
const { nestedInputInfo } = storeToRefs(inputStore);

const toast = inject('toast');
const i18 = useI18n();

const newWidgetApp = ref({});

const props = defineProps({
  addShow: Boolean
});

const handleOpenAddWidgetApp = () => {
  let widgetAppsInputData = [
    {
      input_id: 'widgetAppsInputData_1',
      isPswd: false,
      type: 'text',
      placeholder: 'appbox.input.placeholder.title',
      modelValue: '',
      required: true
    },
    {
      input_id: 'widgetAppsInputData_2',
      isPswd: false,
      type: 'text',
      placeholder: 'appbox.input.placeholder.url',
      modelValue: '',
      prepend: 'https://',
      required: true
    }
  ];
  inputStore.setNestedInfo(widgetAppsInputData);
  modalStore.openModal('appbox.action.addNewWidgetApp', true, true, true);
};

watch(
  nestedInputInfo,
  () => {
    if (
      nestedInputInfo.value.length === 2 &&
      nestedInputInfo.value[0]['modelValue'] &&
      nestedInputInfo.value[1]['modelValue']
    ) {
      modalStore.setCheckConfirmOk();
      newWidgetApp.value = {
        title: nestedInputInfo.value[0]['modelValue'],
        url:
          nestedInputInfo.value[1]['modelValue'].startsWith('https://') ||
          nestedInputInfo.value[1]['modelValue'].startsWith('http://')
            ? nestedInputInfo.value[1]['modelValue']
            : 'https://' + nestedInputInfo.value[1]['modelValue']
      };
    } else {
      newWidgetApp.value = {
        title: '',
        url: ''
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

watch(confirmButtonClicked, () => {
  if (isConfirmed.value && newWidgetApp.value.title && newWidgetApp.value.url) {
    widgetboxStore.addWidgetApp(newWidgetApp.value);
  } else {
    toast(i18.t('appbox.input.check'), 'warn');
  }
});
</script>

<script>
export default {
  name: 'AstraAppBox'
};
</script>

<style lang="scss" scoped>
.app-box-btn-wrapper {
  position: relative;
  width: 100%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app-box-container {
  position: relative;
  width: 80%;
  max-height: 40%;
  min-height: 80px;
  max-width: 600px;
  margin: 20px 0;
  padding: 0 60px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

.add-btn-wrapper {
  height: 50px;
  width: 100%;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  transition: opacity 0.3s ease-in-out;
  display: flex;
}

.app-add-btn {
  display: none;
  opacity: 0;
}

.app-box-btn-wrapper:hover .app-add-btn {
  display: block;
  opacity: 1;
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
