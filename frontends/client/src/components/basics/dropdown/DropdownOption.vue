<template>
  <li
    class="astra-dropdown-option"
    :class="{ 'astra-dropdown-option-selected': props.selected }"
    @click="handleClick"
  >
    <span v-if="$slots.icon" class="astra-dropdown-option-icon">
      <slot name="icon"></slot>
    </span>
    <slot></slot>
  </li>
</template>

<script setup>
const props = defineProps({
  /**
   * @zh 是否禁用
   * @en Whether disabled
   * @defaultValue false
   */
  disabled: {
    type: Boolean,
    default: false
  },
  selected: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

const handleClick = ev => {
  if (!props.disabled) {
    emit('click', ev);
  }
};
</script>

<script>
export default {
  name: 'AstraDropdownOption'
};
</script>

<style lang="scss" scoped>
.astra-dropdown-option {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 18px;
  line-height: 36px;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  color: var(--vt-c-text-1);
  white-space: nowrap;
  transition: color 0.25s;
  cursor: pointer;
}

.astra-dropdown-option:hover {
  color: #75a297;
}

.astra-dropdown-option-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  height: 36px;
}

.astra-dropdown-option-selected {
  background-color: var(--color-neutral-2);
}
</style>
