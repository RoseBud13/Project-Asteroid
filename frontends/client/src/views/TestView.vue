<template>
  <div class="test-container">
    <AstroButton type="primary" @click="sayHi">Primary</AstroButton>
    <AstroButton type="primary" @click="sayHi" disabled>Primary</AstroButton>
    <AstroButton @click="sayHi">Secondary</AstroButton>
    <AstroButton @click="sayHi" disabled>Secondary</AstroButton>
    <AstroButton type="outline" @click="sayHello">Outline</AstroButton>
    <AstroButton type="outline" @click="sayHello" disabled>Outline</AstroButton>
    <AstroButton type="text" @click="sayHello">Text</AstroButton>
    <AstroButton type="text" @click="sayHello" disabled>Text</AstroButton>
    <AstroButton type="text" href="https://github.com">Github</AstroButton>
    <AstroButton type="text" href="https://github.com" disabled
      >Github</AstroButton
    >
    <AstroButton type="bubble" size="bubble" @click="sayHi">Bubble</AstroButton>
    <AstroButton type="bubble" size="bubble" @click="sayHi" disabled
      >Bubble</AstroButton
    >
  </div>
</template>

<script setup>
import AstroButton from '@/components/basics/button/index.vue';

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
