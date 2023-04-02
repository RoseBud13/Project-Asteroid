<template>
  <div class="input-wrapper" v-if="!props.nestedInput">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="props.isPswd ? 'password' : props.type"
      :placeholder="props.placeholder"
    />
  </div>
  <div
    class="input-nested-wrapper"
    v-else-if="props.nestedInput && nestedInputInfo.length > 0"
  >
    <input
      v-for="item in nestedInputInfo"
      :key="item.placeholder"
      :value="item.modelValue"
      @input="item.modelValue = $event.target.value"
      :type="item.isPswd ? 'password' : item.type"
      :placeholder="item.placeholder"
    />
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
.input-wrapper {
  position: relative;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 80%;
  min-width: 220px;
  max-width: 320px;
}

.input-wrapper input {
  position: relative;
  width: 100%;
  height: 35px;
  border: none;
  font-size: 15px;
  padding: 9px 0;
  text-indent: 15px;
  outline: none;
}

.input-nested-wrapper {
  position: relative;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 80%;
  min-width: 220px;
  max-width: 320px;
}

.input-nested-wrapper input {
  position: relative;
  width: 100%;
  height: 35px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0;
  font-size: 15px;
  padding: 9px 0;
  text-indent: 15px;
  outline: none;
}

.input-nested-wrapper input:last-child {
  border-bottom: none;
}

@media (max-width: 600px) {
  .input-wrapper input {
    font-size: 1rem;
  }
}
</style>
