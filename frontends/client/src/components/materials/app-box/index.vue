<template>
  <div class="app-box-container">
    <slot></slot>
  </div>
</template>

<script setup></script>

<script>
export default {
  name: 'AstraAppBox'
};
</script>

<style lang="scss" scoped>
.app-box-container {
  position: relative;
  width: 100%;
  height: 40%;
  margin: 20px 0;
  padding: 0 60px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

@media (max-width: 800px) {
  .app-box-container {
    justify-content: space-around;
  }
}

@media (max-width: 600px) {
  .app-box-container {
    padding: 0 15px;
  }
}
</style>
