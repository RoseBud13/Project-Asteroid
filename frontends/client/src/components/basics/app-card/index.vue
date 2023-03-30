<template>
  <div class="app-card-wrapper">
    <div class="app-icon">
      <slot name="appicon"></slot>
    </div>
  </div>
</template>

<script setup></script>

<script>
export default {
  name: 'AstraAppCard'
};
</script>

<style lang="scss" scoped>
.app-card-wrapper {
  position: relative;
  height: 50%;
  width: 20%;
  max-width: 100px;
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.app-card-wrapper:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.app-icon {
  width: 45px;
  height: 45px;
  font-size: 25px;
  border-radius: 100%;
  background-color: #fff;
  // color: #75a297;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
