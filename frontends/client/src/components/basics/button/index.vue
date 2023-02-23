<template>
  <template v-if="href">
    <a :class="[cls]" :href="href">
      <slot></slot>
    </a>
  </template>
  <template v-else>
    <button
      :class="[cls]"
      :type="nativeType"
      :disabled="false"
      @click="handleClick"
    >
      <slot></slot>
    </button>
  </template>
</template>

<script setup>
import { computed } from 'vue';
import { isString } from '@/utils/is';

const props = defineProps({
  /**
   * @zh 按钮的类型，分为五种：次要按钮、主要按钮、线性按钮、文字按钮、气泡按钮。
   * @en Button types are divided into five types: secondary, primary, outline, text and bubble.
   * @defaultValue 'secondary'
   */
  type: {
    type: String,
    default: 'secondary',
    validator(value) {
      // The value must match one of these strings
      return ['primary', 'secondary', 'outline', 'text', 'bubble'].includes(
        value
      );
    }
  },
  /**
   * @zh 按钮的形状 square - 方形（默认）、circle - 圆形、round - 全圆角
   * @en Button shape
   */
  shape: {
    type: String,
    validator(value) {
      return ['circle', 'round'].includes(value);
    }
  },
  /**
   * @zh 按钮的尺寸
   * @en Button size
   * @values 'mini','small','medium','large', 'bubble'
   * @defaultValue 'medium'
   */
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['mini', 'small', 'medium', 'large', 'bubble'].includes(value);
    }
  },
  /**
   * @zh 按钮是否禁用
   * @en Whether the button is disabled
   * @defaultValue false
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @zh 设置 `button` 的原生 `type` 属性
   * @en Set the native `type` attribute of `button`
   */
  nativeType: {
    type: String,
    default: 'button',
    validator(value) {
      return ['button', 'submit', 'reset'].includes(value);
    }
  },
  /**
   * @zh 设置跳转链接。设置此属性时，按钮渲染为a标签。
   * @en Set up a jump link. When this property is set, the button is rendered as `<a>`
   */
  href: String
});

const emit = defineEmits(['click']);

const handleClick = ev => {
  if (props.disabled) {
    ev.preventDefault();
    return;
  }
  emit('click', ev);
};

const prefixCls = 'astro-btn';

const cls = computed(() => [
  prefixCls,
  `${prefixCls}-${props.type ? props.type : 'secondary'}`,
  `${prefixCls}-shape-${props.shape ? props.shape : 'square'}`,
  `${prefixCls}-size-${props.size ? props.size : 'medium'}`,
  {
    [`${prefixCls}-disabled`]: props.disabled,
    [`${prefixCls}-link`]: isString(props.href)
  }
]);
</script>

<script>
export default {
  name: 'AstroButton'
};
</script>

<style lang="scss" scoped>
.astro-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-weight: 400;
  line-height: 1.5715;
  white-space: nowrap;
  outline: none;
  cursor: pointer;
  transition: all 0.1s cubic-bezier(0, 0, 1, 1);
  appearance: none;
  user-select: none;
}

/***** Primary *****/
.astro-btn-primary,
.astro-btn-primary[type='button'],
.astro-btn-primary[type='submit'] {
  color: #fff;
  background-color: var(--primary-6);
  border: 1px solid transparent;
}

.astro-btn-primary:hover,
.astro-btn-primary[type='button']:hover,
.astro-btn-primary[type='submit']:hover {
  color: #fff;
  background-color: var(--primary-5);
  border: 1px solid transparent;
}

.astro-btn-primary.astro-btn-disabled,
.astro-btn-primary[type='button'].astro-btn-disabled,
.astro-btn-primary[type='submit'].astro-btn-disabled {
  color: #fff;
  background-color: var(--color-primary-light-3);
  border: 1px solid transparent;
  cursor: not-allowed;
}

/***** Secondary *****/
.astro-btn-secondary,
.astro-btn-secondary[type='button'],
.astro-btn-secondary[type='submit'] {
  color: var(--color-text-2);
  background-color: var(--color-secondary);
  border: 1px solid transparent;
}

.astro-btn-secondary:hover,
.astro-btn-secondary[type='button']:hover,
.astro-btn-secondary[type='submit']:hover {
  color: var(--color-text-2);
  background-color: var(--color-secondary-hover);
  border: 1px solid transparent;
}

.astro-btn-secondary.astro-btn-disabled,
.astro-btn-secondary[type='button'].astro-btn-disabled,
.astro-btn-secondary[type='submit'].astro-btn-disabled {
  color: var(--color-text-4);
  background-color: var(--color-secondary-disabled);
  border: 1px solid transparent;
  cursor: not-allowed;
}

/***** Outline *****/
.astro-btn-outline,
.astro-btn-outline[type='button'],
.astro-btn-outline[type='submit'] {
  color: var(--primary-6);
  background-color: transparent;
  border: 1px solid var(--primary-6);
}

.astro-btn-outline:hover,
.astro-btn-outline[type='button']:hover,
.astro-btn-outline[type='submit']:hover {
  color: var(--primary-5);
  background-color: transparent;
  border: 1px solid var(--primary-5);
}

.astro-btn-outline.astro-btn-disabled,
.astro-btn-outline[type='button'].astro-btn-disabled,
.astro-btn-outline[type='submit'].astro-btn-disabled {
  color: var(--color-primary-light-3);
  background-color: transparent;
  border: 1px solid var(--color-primary-light-3);
  cursor: not-allowed;
}

/***** Text *****/
.astro-btn-text,
.astro-btn-text[type='button'],
.astro-btn-text[type='submit'] {
  color: var(--primary-6);
  background-color: transparent;
  border: 1px solid transparent;
}

.astro-btn-text:hover,
.astro-btn-text[type='button']:hover,
.astro-btn-text[type='submit']:hover {
  color: var(--primary-6);
  background-color: var(--color-fill-2);
  border: 1px solid transparent;
}

.astro-btn-text.astro-btn-disabled,
.astro-btn-text[type='button'].astro-btn-disabled,
.astro-btn-text[type='submit'].astro-btn-disabled {
  color: var(--color-primary-light-3);
  background-color: transparent;
  border: 1px solid transparent;
  cursor: not-allowed;
}

/***** Bubble *****/
.astro-btn-bubble,
.astro-btn-bubble[type='button'],
.astro-btn-bubble[type='submit'] {
  color: rgba(0, 0, 0, 0.8);
  background-color: #75a297;
  border: none;
  transition: 0.3s ease;
  line-height: normal;
}

.astro-btn-bubble:hover,
.astro-btn-bubble[type='button']:hover,
.astro-btn-bubble[type='submit']:hover {
  color: rgba(255, 255, 255, 0.8);
  background-color: rgb(95, 140, 128);
}

.astro-btn-bubble.astro-btn-disabled,
.astro-btn-bubble[type='button'].astro-btn-disabled,
.astro-btn-bubble[type='submit'].astro-btn-disabled {
  color: #5f5f5f;
  background-color: #93bcb2;
  border: 1px solid transparent;
  cursor: not-allowed;
}

/***** SIZE *****/
.astro-btn-size-medium {
  height: var(--btn-size-medium-height);
  padding: 0 15px;
  font-size: 14px;
  border-radius: var(--border-radius-small);
}

.astro-btn-size-bubble {
  padding: 13px 45px;
  margin: 15px 0;
  font-size: 15px;
  font-weight: 700;
  border-radius: 15px;
}

/***** Link *****/
.astro-btn-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
</style>
