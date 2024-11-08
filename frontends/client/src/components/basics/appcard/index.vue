<template>
  <div class="app-card-wrapper">
    <div
      class="app-card-delete"
      :title="$t('appcard.button.delete')"
      v-if="props.hasDelete"
      @click="handleDelete"
    >
      <IconClose></IconClose>
    </div>
    <div class="app-icon" @click="handleClick">
      <slot name="appicon"></slot>
    </div>
    <div class="app-tag" v-if="$slots.apptag">
      <slot name="apptag"></slot>
    </div>
  </div>
</template>

<script setup>
import IconClose from '@/components/icons/IconClose.vue';

const emit = defineEmits(['clickWidgetApp', 'delete']);

const handleClick = ev => {
  emit('clickWidgetApp', ev);
};

const handleDelete = ev => {
  emit('delete', ev);
};

const props = defineProps({
  hasDelete: Boolean
});
</script>

<script>
export default {
  name: 'AstraAppCard'
};
</script>

<style lang="scss" scoped>
.app-card-wrapper {
  position: relative;
  height: 80px;
  width: 20%;
  max-width: 100px;
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  cursor: pointer;
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
  cursor: pointer;
}

.app-tag {
  width: 150%;
  height: 20px;
  font-size: x-small;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.modal-content-multi .app-card-wrapper {
  width: 25%;
}

@media (max-width: 600px) {
  .app-card-delete {
    width: 15px;
    height: 15px;
    font-size: 13px;
  }
}
</style>
