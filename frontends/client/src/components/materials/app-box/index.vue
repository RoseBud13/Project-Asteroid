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
        @click="handleAppWidgetApp"
        >+</AstraButton
      >
    </div>
  </div>
</template>

<script setup>
import AstraButton from '@/components/basics/button/index.vue';
import { useWidgetboxStore } from '@/stores/widgetbox';
// import { useModalStore } from '@/stores/modal';

const widgetboxStore = useWidgetboxStore();
// const modalStore = useModalStore();

const props = defineProps({
  addNew: Boolean,
  addShow: Boolean,
  addBtnFlex: Boolean
});

let newTest = {
  title: 'b612',
  url: 'https://b612.one'
};

const handleAppWidgetApp = () => {
  // modalStore.openFormModal('Add New Widget App');
  widgetboxStore.addWidgetApp(newTest);
};
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
    padding: 0 15px;
    width: 100%;
  }
}
</style>
