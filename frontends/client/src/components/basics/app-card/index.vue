<template>
  <div class="app-card-wrapper">
    <div class="app-card-delete" title="delete" @click="handleDelete">
      <IconClose></IconClose>
    </div>
    <div class="app-icon" @click="handleClick">
      <slot name="appicon"></slot>
    </div>
  </div>
</template>

<script setup>
import IconClose from '@/components/icons/IconClose.vue';

const emit = defineEmits(['openWidgetApp', 'delete']);

const handleClick = ev => {
  emit('openWidgetApp', ev);
};

const handleDelete = ev => {
  emit('delete', ev);
};
</script>

<script>
export default {
  name: 'AstraAppCard'
};
</script>

<style lang="scss" scoped>
.app-card-wrapper {
  position: relative;
  height: 50%;
  width: 20%;
  max-width: 100px;
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.app-card-wrapper:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.app-card-delete {
  position: absolute;
  top: 0;
  right: 0;
  width: 17px;
  height: 17px;
  font-size: 15px;
  margin: 5px 5px 0 0;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
}

.app-card-wrapper:hover .app-card-delete {
  display: flex;
}

.app-card-delete:hover {
  background-color: rgba(255, 255, 255, 0.6);
}

.app-icon {
  width: 45px;
  height: 45px;
  font-size: 25px;
  border-radius: 100%;
  background-color: #fff;
  // color: #75a297;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
