<template>
  <div class="notes-card-wrapper">
    <div class="notes-card-text-wrapper">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.notes-card-wrapper {
  position: relative;
  margin-left: 80px;
  width: calc(100% - 100px);
  max-width: 350px;
  min-height: 100px;
  border-radius: 30px;
  background-color: #dde7c7;
  cursor: pointer;
}

.notes-card-text-wrapper {
  padding: 15px;
}
</style>
