<template>
  <div class="homepage-wrapper" ref="homepage">
    <Background :wallpaperUrl="wallpaper" preventUserSelect>
      <template #widgetbox>
        <SearchBar autofocus></SearchBar>
      </template>
    </Background>
    <Navbar>
      <template #left>
        <h2>{{ $t('home.title') }}</h2>
      </template>
      <template #mid>
        <ClockItem blink textColor="#fff"></ClockItem>
      </template>
      <template #right>
        <AstraDropdown>
          <template #trigger>
            <AstraButton type="nav">A/文</AstraButton>
          </template>
          <template #content>
            <AstraDropdownOption
              v-for="item in locales"
              :key="item.value"
              @click="changeLocale(item.value)"
            >
              {{ item.label }}
            </AstraDropdownOption>
          </template>
        </AstraDropdown>
        <AstraButton
          type="nav"
          href="https://github.com/RoseBud13/Project-Asteroid"
          >GitHub</AstraButton
        >
        <AstraButton type="nav" v-if="!isFullscreen" @click="openFullscreen()"
          >全屏</AstraButton
        >
        <AstraButton type="nav" v-else @click="closeFullscreen"
          >取消全屏</AstraButton
        >
      </template>
    </Navbar>
    <HomeDashboard></HomeDashboard>
  </div>
</template>

<script setup>
import Background from '@/components/background/index.vue';
import Navbar from '@/components/navbar/index.vue';
import HomeDashboard from '@/components/dashboard/index.vue';
import ClockItem from '@/components/materials/ClockItem.vue';
import AstraDropdown from '@/components/basics/dropdown/index.vue';
import AstraDropdownOption from '@/components/basics/dropdown/dropdown-option.vue';
import AstraButton from '@/components/basics/button/index.vue';
import SearchBar from '@/components/search-bar/index.vue';
import { LOCALE_OPTIONS } from '@/locale';
import useLocale from '@/hooks/locale';
import useConfig from '@/config';
import { useFullscreen } from '@/utils/browser';
import { useGlobal } from '@/stores/global';
import { storeToRefs } from 'pinia';
import { ref, onMounted, onUnmounted } from 'vue';

const homepage = ref(null);

const { openFullscreen, closeFullscreen } = useFullscreen();
const globalStore = useGlobal();
const { isFullscreen } = storeToRefs(globalStore);

const locales = [...LOCALE_OPTIONS];
const { changeLocale } = useLocale();
const { getLocalConfig } = useConfig();

const wallpaperInfo = getLocalConfig('wallpaper');
const wallpaper = wallpaperInfo['bing'][0];

const scrollTop = ref(0);
const scrollStart = ref(0);
const target = ref(); // distence of toggling dashbaord
const scrollTimeoutTime = ref(800); // 0.8s is the minimum scroll interval to act as debounce

const setSize = () => {
  target.value = 0.9 * homepage.value.clientHeight; // dsshboard initial top 90vh
};

const handleScroll = event => {
  scrollTop.value = event.target.scrollTop;
  if (scrollTop.value - scrollStart.value > 1) {
    homepage.value.removeEventListener('scroll', handleScroll);
    homepage.value.scroll({
      top: target.value,
      left: 0,
      behavior: 'smooth'
    });
    scrollStart.value = target.value;
    globalStore.toggleDashboard();
  } else if (scrollStart.value - scrollTop.value > 1) {
    homepage.value.removeEventListener('scroll', handleScroll);
    homepage.value.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    scrollStart.value = 0;
    globalStore.toggleDashboard();
  }
};

const handleScrollEnd = () => {
  homepage.value.removeEventListener('scroll', handleScrollEnd);
  let scrollTimeout;
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    homepage.value.addEventListener('scroll', handleScroll);
    homepage.value.addEventListener('scroll', handleScrollEnd);
  }, scrollTimeoutTime.value);
};

onMounted(() => {
  setSize();
  homepage.value.addEventListener('scroll', handleScroll);
  homepage.value.addEventListener('scroll', handleScrollEnd);
  document.addEventListener('fullscreenchange', () => {
    globalStore.toggleFullscreen();
    setSize();
  });
  window.addEventListener('resize', () => {
    setSize();
  });
});

onUnmounted(() => {
  homepage.value.removeEventListener('scroll', handleScroll);
  homepage.value.removeEventListener('scroll', handleScrollEnd);
  document.removeEventListener('fullscreenchange', () => {
    globalStore.toggleFullscreen();
    setSize();
  });
  window.removeEventListener('resize', () => {
    setSize();
  });
});
</script>

<style lang="scss" scoped>
.homepage-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.homepage-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
