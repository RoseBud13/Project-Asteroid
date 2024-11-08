<template>
  <div class="dashboard-widget-container">
    <div class="widget-daily-update" :class="cls">
      <div class="widget-daily-update-quote">{{ dailyQuote.content }}</div>
      <div class="widget-daily-update-quote-info">{{ dailyQuote.info }}</div>
    </div>
    <h1>widget</h1>
    <div class="widget-test">
      <h1>test</h1>
      <br />
      <h1>test</h1>
      <br />
      <h1>test</h1>
      <br />
      <h1>hi</h1>
      <br />
      <h1>test</h1>
      <br />
      <h1>hi</h1>
      <br />
      <h1>test</h1>
      <br />
      <h1>hi</h1>
      <br />
      <h1>test</h1>
      <br />
      <h1>hi</h1>
      <br />
      <h1>test</h1>
      <br />
      <h1>hi</h1>
      <br />
      <h1>test</h1>
      <br />
    </div>
  </div>
</template>

<script setup>
import { useDashboardStore } from '@/stores/dashboard';
import { useWallpaperStore } from '@/stores/wallpaper';
import { storeToRefs } from 'pinia';
import { watch, ref } from 'vue';

const wallpaperStore = useWallpaperStore();
const { wallpaperBrightness } = storeToRefs(wallpaperStore);

const dashboardStore = useDashboardStore();
const { dailyQuote } = storeToRefs(dashboardStore);

const cls = ref('');

watch(wallpaperBrightness, () => {
  if (
    wallpaperBrightness.value === 'dark' ||
    wallpaperBrightness.value === 'error'
  ) {
    cls.value = 'widget-daily-update-light';
  } else {
    cls.value = '';
  }
});
</script>

<style lang="scss" scoped>
.dashboard-widget-container {
  position: relative;
  width: 100%;
  padding: 0 10px;
}

.widget-daily-update {
  position: relative;
  width: 100%;
  margin: 20px 0;
}

.widget-daily-update-light {
  color: #fff;
}

.widget-daily-update-quote {
  font-size: 1.1rem;
}

.widget-daily-update-quote-info {
  margin-top: 15px;
  font-size: 0.9rem;
  text-align: right;
}

.widget-test {
  width: 200px;
  height: 2000px;
  background-color: white;
}
</style>
