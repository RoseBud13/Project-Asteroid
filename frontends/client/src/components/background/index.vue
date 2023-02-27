<template>
  <div class="background-wrapper">
    <div class="wallpaper-wrapper">
      <img v-if="imgUrl" class="wallpaper-img" :src="imgUrl" />
      <div v-else class="wallpaper-placeholder"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { isUrl } from '@/utils/is';

const props = defineProps({
  wallpaperUrl: String
});

const imgUrl = computed(() => {
  return isUrl(props.wallpaperUrl) ? props.wallpaperUrl : '';
});
</script>

<script>
export default {
  name: 'BackgroundComponent'
};
</script>

<style lang="scss" scoped>
.background-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 0;
}

.wallpaper-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 0;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
}

.wallpaper-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
}

.wallpaper-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(#f9dbbd, #ffa5ab, #da627d);
}
</style>
