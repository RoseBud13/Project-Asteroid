<template>
  <template v-if="href">
    <a :class="[cls]" :href="href" :target="target">
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
   * @zh 按钮的类型，分为六种：次要按钮、主要按钮、线性按钮、文字按钮、气泡按钮、导航按钮。
   * @en Button types are divided into six types: secondary, primary, outline, text, bubble and nav.
   * @defaultValue 'secondary'
   */
  type: {
    type: String,
    default: 'secondary',
    validator(value) {
      // The value must match one of these strings
      return [
        'primary',
        'secondary',
        'outline',
        'text',
        'bubble',
        'nav'
      ].includes(value);
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
  href: String,
  /**
   * @zh 设置跳转链接跳转属性。https://www.w3schools.com/tags/att_a_target.asp
   * @en Set up the <a> tag target property
   * @defaultValue '_blank'
   */
  target: {
    type: String,
    default: '_blank',
    validator(value) {
      return ['_blank', '_self', '_parent', '_top'].includes(value);
    }
  }
});

const emit = defineEmits(['click']);

const handleClick = ev => {
  if (props.disabled) {
    ev.preventDefault();
    return;
  }
  emit('click', ev);
};

const prefixCls = 'astra-btn';

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
  name: 'AstraButton'
};
</script>

<style lang="scss" scoped>
.astra-btn {
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
.astra-btn-primary,
.astra-btn-primary[type='button'],
.astra-btn-primary[type='submit'] {
  color: #fff;
  background-color: var(--primary-6);
  border: 1px solid transparent;
}

.astra-btn-primary:hover,
.astra-btn-primary[type='button']:hover,
.astra-btn-primary[type='submit']:hover {
  color: #fff;
  background-color: var(--primary-5);
  border: 1px solid transparent;
}

.astra-btn-primary.astra-btn-disabled,
.astra-btn-primary[type='button'].astra-btn-disabled,
.astra-btn-primary[type='submit'].astra-btn-disabled {
  color: #fff;
  background-color: var(--color-primary-light-3);
  border: 1px solid transparent;
  cursor: not-allowed;
}

/***** Secondary *****/
.astra-btn-secondary,
.astra-btn-secondary[type='button'],
.astra-btn-secondary[type='submit'] {
  color: var(--color-text-2);
  background-color: var(--color-secondary);
  border: 1px solid transparent;
}

.astra-btn-secondary:hover,
.astra-btn-secondary[type='button']:hover,
.astra-btn-secondary[type='submit']:hover {
  color: var(--color-text-2);
  background-color: var(--color-secondary-hover);
  border: 1px solid transparent;
}

.astra-btn-secondary.astra-btn-disabled,
.astra-btn-secondary[type='button'].astra-btn-disabled,
.astra-btn-secondary[type='submit'].astra-btn-disabled {
  color: var(--color-text-4);
  background-color: var(--color-secondary-disabled);
  border: 1px solid transparent;
  cursor: not-allowed;
}

/***** Outline *****/
.astra-btn-outline,
.astra-btn-outline[type='button'],
.astra-btn-outline[type='submit'] {
  color: var(--primary-6);
  background-color: transparent;
  border: 1px solid var(--primary-6);
}

.astra-btn-outline:hover,
.astra-btn-outline[type='button']:hover,
.astra-btn-outline[type='submit']:hover {
  color: var(--primary-5);
  background-color: transparent;
  border: 1px solid var(--primary-5);
}

.astra-btn-outline.astra-btn-disabled,
.astra-btn-outline[type='button'].astra-btn-disabled,
.astra-btn-outline[type='submit'].astra-btn-disabled {
  color: var(--color-primary-light-3);
  background-color: transparent;
  border: 1px solid var(--color-primary-light-3);
  cursor: not-allowed;
}

/***** Text *****/
.astra-btn-text,
.astra-btn-text[type='button'],
.astra-btn-text[type='submit'] {
  color: var(--primary-6);
  background-color: transparent;
  border: 1px solid transparent;
}

.astra-btn-text:hover,
.astra-btn-text[type='button']:hover,
.astra-btn-text[type='submit']:hover {
  color: var(--primary-6);
  background-color: var(--color-fill-2);
  border: 1px solid transparent;
}

.astra-btn-text.astra-btn-disabled,
.astra-btn-text[type='button'].astra-btn-disabled,
.astra-btn-text[type='submit'].astra-btn-disabled {
  color: var(--color-primary-light-3);
  background-color: transparent;
  border: 1px solid transparent;
  cursor: not-allowed;
}

/***** Bubble *****/
.astra-btn-bubble,
.astra-btn-bubble[type='button'],
.astra-btn-bubble[type='submit'] {
  color: rgba(0, 0, 0, 0.8);
  background-color: #75a297;
  border: none;
  transition: 0.3s ease;
  line-height: normal;
}

.astra-btn-bubble:hover,
.astra-btn-bubble[type='button']:hover,
.astra-btn-bubble[type='submit']:hover {
  color: rgba(255, 255, 255, 0.8);
  background-color: rgb(95, 140, 128);
}

.astra-btn-bubble.astra-btn-disabled,
.astra-btn-bubble[type='button'].astra-btn-disabled,
.astra-btn-bubble[type='submit'].astra-btn-disabled {
  color: #5f5f5f;
  background-color: #93bcb2;
  border: 1px solid transparent;
  cursor: not-allowed;
}

/***** Nav *****/
.astra-btn-nav,
.astra-btn-nav[type='button'],
.astra-btn-nav[type='submit'] {
  color: #fff;
  background-color: transparent;
  border: 1px solid transparent;
}

.astra-btn-nav:hover,
.astra-btn-nav[type='button']:hover,
.astra-btn-nav[type='submit']:hover {
  color: #98c9a3;
  background-color: transparent;
  border: 1px solid transparent;
}

.astra-btn-nav.astra-btn-disabled,
.astra-btn-nav[type='button'].astra-btn-disabled,
.astra-btn-nav[type='submit'].astra-btn-disabled {
  color: #bfbfbf;
  background-color: transparent;
  border: 1px solid transparent;
  cursor: not-allowed;
}

/***** SIZE *****/
.astra-btn-size-medium {
  height: var(--btn-size-medium-height);
  padding: 0 15px;
  font-size: 14px;
  border-radius: var(--border-radius-small);
}

.astra-btn-size-bubble {
  padding: 13px 45px;
  margin: 15px 0;
  font-size: 15px;
  font-weight: 700;
  border-radius: 15px;
}

/***** Link *****/
.astra-btn-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
</style>
