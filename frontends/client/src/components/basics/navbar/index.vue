<template>
  <div :class="[cls]">
    <div class="navbar-container">
      <div class="navbar-left">
        <slot name="left"></slot>
      </div>
      <div class="navbar-mid">
        <slot name="mid"></slot>
      </div>
      <div class="navbar-right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  /**
   * @zh Navbar position 属性（fixed | absolute)
   * @en Navbar position property（fixed | absolute)
   * @values 'fixed', 'absolute'
   * @defaultValue 'fixed'
   */
  position: {
    type: String,
    default: 'fixed',
    validator(value) {
      return ['fixed', 'absolute'].includes(value);
    }
  },
  /**
   * @zh Navbar size 属性（viewWidth | viewWidth)
   * @en Navbar size property（viewWidth: 100vw | containerWidth: 100%)
   * @values 'viewWidth', 'containerWidth'
   * @defaultValue 'viewWidth'
   */
  size: {
    type: String,
    default: 'viewWidth',
    validator(value) {
      return ['viewWidth', 'containerWidth'].includes(value);
    }
  }
});

const prefixCls = 'astra-navbar';

const cls = computed(() => [
  prefixCls,
  `${prefixCls}-${props.position ? props.position : 'fixed'}`,
  `${prefixCls}-${props.size ? props.size : 'viewWidth'}`
]);
</script>

<script>
export default {
  name: 'NavbarItem'
};
</script>

<style lang="scss" scoped>
.astra-navbar {
  height: 50px;
  top: 0;
  z-index: 2;
  user-select: none;
}

.astra-navbar-fixed {
  position: fixed;
}

.astra-navbar-absolute {
  position: absolute;
}

.astra-navbar-viewWidth {
  width: 100vw;
}

.astra-navbar-containerWidth {
  width: 100%;
}

.navbar-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.navbar-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  flex: 1;
}

.navbar-mid {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 2;
}

.navbar-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  flex: 1;
}

.navbar-right :deep(> *) {
  margin-right: 10px;
}

@media (max-width: 480px) {
  .navbar-mid {
    display: none;
  }
}
</style>
