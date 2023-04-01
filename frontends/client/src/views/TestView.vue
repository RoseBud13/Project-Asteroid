<template>
  <div class="test-container">
    <AstraButton type="primary" @click="sayHi">Primary</AstraButton>
    <AstraButton type="primary" @click="sayHi" disabled>Primary</AstraButton>
    <AstraButton @click="sayHi">Secondary</AstraButton>
    <AstraButton @click="sayHi" disabled>Secondary</AstraButton>
    <AstraButton type="outline" @click="sayHello">Outline</AstraButton>
    <AstraButton type="outline" @click="sayHello" disabled>Outline</AstraButton>
    <AstraButton type="text" @click="sayHello">Text</AstraButton>
    <AstraButton type="text" @click="sayHello" disabled>Text</AstraButton>
    <AstraButton type="text" href="https://github.com">Github</AstraButton>
    <AstraButton type="text" href="https://github.com" disabled
      >Github</AstraButton
    >
    <AstraButton type="emerald">Emerald</AstraButton>
    <AstraButton type="emerald" disabled>Emerald</AstraButton>
  </div>
  <div class="test-container">
    <AstraButton type="text" @click="sayHello">Text</AstraButton>
    <AstraDropdown>
      <template #trigger>
        <AstraButton>Dropdown</AstraButton>
      </template>
      <template #content>
        <AstraDropdownOption>
          <template #icon>
            <IconCommunity />
          </template>
          <template #default>
            <a href="https://github.com">Community</a>
          </template>
        </AstraDropdownOption>
        <AstraDropdownOption @click="sayHello">Greetings</AstraDropdownOption>
        <AstraDropdownOption @click="sayHi">Hi there</AstraDropdownOption>
        <AstraDropdownOption>Test</AstraDropdownOption>
      </template>
    </AstraDropdown>
    <AstraButton type="text" @click="sayHello" disabled>Text</AstraButton>
    <AstraDropdown>
      <template #trigger>
        <AstraButton type="emerald" shape="bubble">Dropdown</AstraButton>
      </template>
      <template #content>
        <AstraDropdownOption>
          <template #icon>
            <IconCommunity />
          </template>
          <template #default>
            <a href="https://github.com">Community</a>
          </template>
        </AstraDropdownOption>
        <AstraDropdownOption @click="sayHello" disabled
          >Greetings</AstraDropdownOption
        >
        <AstraDropdownOption @click="sayHi">Hi there</AstraDropdownOption>
        <AstraDropdownOption>Test</AstraDropdownOption>
      </template>
    </AstraDropdown>
    <AstraButton type="text" href="https://github.com">Github</AstraButton>
  </div>
  <div class="test-container">
    <ClockItem blink></ClockItem>
  </div>
  <div class="test-container" style="background-color: black">
    <AstraButton type="nav">Nav</AstraButton>
    <AstraButton type="nav" disabled>Nav</AstraButton>
  </div>
  <div class="test-container">
    <AstraButton shape="circle" size="mini">+</AstraButton>
    <AstraButton shape="circle" size="small">+</AstraButton>
    <AstraButton shape="circle">+</AstraButton>
    <AstraButton shape="circle" size="large">+</AstraButton>
    <AstraButton size="mini">Button</AstraButton>
    <AstraButton size="small">Button</AstraButton>
    <AstraButton>Button</AstraButton>
    <AstraButton size="large">Button</AstraButton>
  </div>
  <div class="test-container">
    <AstraButton shape="bubble" size="mini">Bubble</AstraButton>
    <AstraButton shape="bubble" size="small">Bubble</AstraButton>
    <AstraButton shape="bubble">Bubble</AstraButton>
    <AstraButton shape="bubble" size="large">Bubble</AstraButton>
    <AstraButton shape="round" size="mini">Round</AstraButton>
    <AstraButton shape="round" size="small">Round</AstraButton>
    <AstraButton shape="round">Round</AstraButton>
    <AstraButton shape="round" size="large">Round</AstraButton>
  </div>
  <div class="test-container">
    <AstraButton type="emerald" shape="bubble">Bubble</AstraButton>
    <AstraButton type="emerald" shape="bubble" disabled>Bubble</AstraButton>
    <AstraButton type="emerald" shape="bubble" size="large">Bubble</AstraButton>
    <AstraButton type="emerald" shape="bubble" size="mini">Bubble</AstraButton>
  </div>
  <div class="test-container">
    <AstraButton type="emerald" @click="handleOpenModal"
      >Open modal</AstraButton
    >
    <AstraModal :visible="modalVisible" @cancel="handleCancelModal">
      <template #title>This is a title</template>
      <div>
        You can customize modal content text by the current situation. This
        modal will be closed immediately once you press the OK button.
      </div>
      <template #footer>
        <AstraButton size="mini" @click="handleCancelModal">Cancel</AstraButton>
        <AstraButton type="emerald" size="mini" @click="handleOkModal"
          >OK</AstraButton
        >
      </template>
    </AstraModal>
  </div>
  <div class="test-container">
    <AstraButton type="emerald" @click="handleOpenModal1"
      >Open fullscreen modal</AstraButton
    >
    <AstraModal
      fullscreen
      :visible="modalVisible1"
      :embeddedUrl="`https://bilibili.com`"
      @cancel="handleCancelModal1"
    >
      <template #title>Bilibili</template>
      <template #footer>
        <AstraButton @click="handleCancelModal1">Cancel</AstraButton>
        <AstraButton type="emerald" @click="handleOkModal1">OK</AstraButton>
      </template>
    </AstraModal>
  </div>
  <div class="test-container">
    <AstraInput v-model="message"></AstraInput>
    <p>Message is: {{ message }}</p>
    <p v-for="item in nestedInfo" :key="item.placeholder">
      nested is {{ item.modelValue }}
    </p>
    <AstraInput nestedInput v-model="nestedInputInfo"></AstraInput>
  </div>
</template>

<script setup>
import AstraButton from '@/components/basics/button/index.vue';
import AstraDropdown from '@/components/basics/dropdown/index.vue';
import AstraDropdownOption from '@/components/basics/dropdown/dropdown-option.vue';
import IconCommunity from '@/components/icons/IconCommunity.vue';
import ClockItem from '@/components/materials/ClockItem.vue';
import AstraModal from '@/components/basics/modal/index.vue';
import AstraInput from '@/components/basics/input/index.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useInputStore } from '@/stores/input';

const inputStore = useInputStore();
const { nestedInputInfo } = storeToRefs(inputStore);

const message = ref('');

onMounted(() => {
  let nestedInputData = [
    {
      isPswd: true,
      type: 'text',
      placeholder: '1',
      modelValue: ''
    },
    {
      isPswd: false,
      type: 'text',
      placeholder: '2',
      modelValue: ''
    },
    {
      isPswd: false,
      type: 'text',
      placeholder: '3',
      modelValue: ''
    }
  ];
  inputStore.setNestedInfo(nestedInputData);
});

onUnmounted(() => {
  inputStore.clearNestedInfo();
});

function sayHi() {
  console.log('hi there!');
}

function sayHello() {
  console.log('hello world!');
}

const modalVisible = ref(false);

const handleOpenModal = () => {
  modalVisible.value = true;
};

const handleOkModal = () => {
  modalVisible.value = false;
};

const handleCancelModal = () => {
  modalVisible.value = false;
};

const modalVisible1 = ref(false);

const handleOpenModal1 = () => {
  modalVisible1.value = true;
};

const handleOkModal1 = () => {
  modalVisible1.value = false;
};

const handleCancelModal1 = () => {
  modalVisible1.value = false;
};
</script>

<style lang="scss" scoped>
.test-container {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
