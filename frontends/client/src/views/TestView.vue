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
    <AstraButton type="bubble" size="bubble" @click="sayHi">Bubble</AstraButton>
    <AstraButton type="bubble" size="bubble" @click="sayHi" disabled
      >Bubble</AstraButton
    >
  </div>
  <div class="test-container">
    <AstraButton type="text" @click="sayHello">Text</AstraButton>
    <AstraDropdown>
      <AstraButton>Dropdown</AstraButton>
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
      <AstraButton type="bubble" size="bubble">Dropdown</AstraButton>
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
</template>

<script setup>
import AstraButton from '@/components/basics/button/index.vue';
import AstraDropdown from '@/components/basics/dropdown/index.vue';
import AstraDropdownOption from '@/components/basics/dropdown/dropdown-option.vue';
import IconCommunity from '@/components/icons/IconCommunity.vue';
import ClockItem from '@/components/materials/ClockItem.vue';

function sayHi() {
  console.log('hi there!');
}

function sayHello() {
  console.log('hello world!');
}
</script>

<style lang="scss" scoped>
.test-container {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
