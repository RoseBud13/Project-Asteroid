<template>
  <div
    class="background-wrapper"
    @dblclick="widgetboxStore.toggleWidgetbox()"
    :style="{ userSelect: props.preventUserSelect ? 'none' : 'auto' }"
  >
    <div class="wallpaper-wrapper">
      <video
        v-if="videoUrl"
        class="wallpaper-vid"
        autoplay
        webkit-playsinline="true"
        playsinline="true"
        x5-video-player-type="h5-page"
        :onended="handleVideoEnd"
      >
        <source :src="videoUrl" type="video/mp4" />
      </video>
      <img
        v-else-if="imgUrl"
        class="wallpaper-img"
        :src="imgUrl"
        draggable="false"
      />
      <div v-else class="wallpaper-placeholder"></div>
    </div>
    <div
      class="widgetbox-container"
      :class="[showWidgetbox ? 'widgetbox-container-show' : '']"
    >
      <slot name="widgetbox"></slot>
    </div>
    <div
      ref="sidebarLeft"
      class="sidebar-wrapper-left"
      v-if="$slots.sidebarLeft"
    >
      <slot name="sidebarLeft"></slot>
    </div>
    <div
      ref="sidebarRight"
      class="sidebar-wrapper-right"
      v-if="$slots.sidebarRight"
    >
      <slot name="sidebarRight"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { isUrl } from '@/utils/is';
import { useWidgetboxStore } from '@/stores/widgetbox';
import { useWallpaperStore } from '@/stores/wallpaper';

const sidebarLeft = ref(null);
const sidebarRight = ref(null);

const widgetboxStore = useWidgetboxStore();

const { showWidgetbox } = storeToRefs(widgetboxStore);

const wallpaperStore = useWallpaperStore();

watch(showWidgetbox, () => {
  if (showWidgetbox.value) {
    setTimeout(() => {
      document.querySelector('.search-input input').focus();
    }, 200);
  }
});

const props = defineProps({
  wallpaperUrl: String,
  preventUserSelect: {
    type: Boolean,
    default: false
  },
  videoUrl: String
});

const imgUrl = computed(() => {
  return isUrl(props.wallpaperUrl) ? props.wallpaperUrl : '';
});

const handleVideoEnd = () => {
  wallpaperStore.setVideoWallpaper('');
};

defineExpose({
  sidebarLeft,
  sidebarRight
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
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  pointer-events: none;
  background: var(--vt-c-gray-light-5);
}

.wallpaper-vid {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.wallpaper-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(#77bfa3, #bfd8bd, #edeec9);
}

.widgetbox-container {
  position: absolute;
  top: 40%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  transition: opacity 0.35s, visibility 0.35s;
  visibility: hidden;
  opacity: 0;
  z-index: 1;
}

.widgetbox-container-show {
  visibility: visible;
  opacity: 1;
}

.sidebar-wrapper-left {
  position: absolute;
  left: 0;
  height: 80%;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar-wrapper-right {
  position: absolute;
  right: 0;
  height: 80%;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
