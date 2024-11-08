<template>
  <div class="input-outline-wrapper" v-if="!props.nestedInput">
    <div class="input-wrapper">
      <div class="input-prepend-wrapper" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :type="props.isPswd ? 'password' : props.type"
        :placeholder="$t(props.placeholder)"
        :required="props.required"
      />
      <div class="input-append-wrapper" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </div>
  </div>
  <div
    class="nested-input-outline-wrapper"
    v-else-if="props.nestedInput && nestedInputInfo.length > 0"
  >
    <div
      class="input-wrapper"
      v-for="item in nestedInputInfo"
      :key="item.placeholder"
    >
      <div class="input-prepend-wrapper" v-if="item.prepend">
        {{ item.prepend }}
      </div>
      <input
        :value="item.modelValue"
        @input="item.modelValue = $event.target.value"
        :type="item.isPswd ? 'password' : item.type"
        :placeholder="$t(item.placeholder)"
        :required="item.required"
      />
      <div class="input-append-wrapper" v-if="item.append">
        {{ item.append }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useInputStore } from '@/stores/input';

const inputStore = useInputStore();
const { nestedInputInfo } = storeToRefs(inputStore);

const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: ''
  },
  isPswd: Boolean,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: 'placeholder'
  },
  nestedInput: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:modelValue']);
</script>

<script>
export default {
  name: 'AstraInput'
};
</script>

<style lang="scss" scoped>
.input-outline-wrapper {
  position: relative;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 80%;
  min-width: 220px;
  max-width: 320px;
}

.input-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-prepend-wrapper {
  background-color: #f5f7fa;
  font-size: 15px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
}

.input-wrapper input {
  position: relative;
  width: 100%;
  height: 35px;
  border: none;
  font-size: 15px;
  text-indent: 15px;
  outline: none;
  flex: 1;
}

.input-append-wrapper {
  background-color: #f5f7fa;
  font-size: 15px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
}

.nested-input-outline-wrapper {
  position: relative;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 80%;
  min-width: 220px;
  max-width: 320px;
}

.nested-input-outline-wrapper .input-wrapper {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.nested-input-outline-wrapper .input-wrapper:last-child {
  border-bottom: none;
}

@media (max-width: 600px) {
  .input-wrapper input {
    font-size: 1rem;
  }
}
</style>
