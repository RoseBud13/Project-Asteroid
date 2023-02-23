<template>
  <li class="astro-dropdown-option" @click="handleClick">
    <span v-if="$slots.icon" class="astro-dropdown-option-icon">
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
  name: 'AstroDropdownOption'
};
</script>

<style lang="scss" scoped>
.astro-dropdown-option {
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

.astro-dropdown-option:hover {
  color: #75a297;
}

.astro-dropdown-option-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  height: 36px;
}
</style>
