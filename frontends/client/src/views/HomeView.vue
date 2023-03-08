<template>
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
</template>

<script setup>
import Background from '@/components/background/index.vue';
import Navbar from '@/components/navbar/index.vue';
import ClockItem from '@/components/materials/ClockItem.vue';
import AstraDropdown from '@/components/basics/dropdown/index.vue';
import AstraDropdownOption from '@/components/basics/dropdown/dropdown-option.vue';
import AstraButton from '@/components/basics/button/index.vue';
import SearchBar from '@/components/search-bar/index.vue';
import { LOCALE_OPTIONS } from '@/locale';
import useLocale from '@/hooks/locale';
import useConfig from '@/config';
import { useFullscreen } from '@/utils/browser';
import { useGlobe } from '@/stores/globe';
import { storeToRefs } from 'pinia';

const { openFullscreen, closeFullscreen } = useFullscreen();
const globeStore = useGlobe();
const { isFullscreen } = storeToRefs(globeStore);

const locales = [...LOCALE_OPTIONS];
const { changeLocale } = useLocale();
const { getLocalConfig } = useConfig();

document.addEventListener('fullscreenchange', () => {
  globeStore.toggleFullscreen();
});

const wallpaperInfo = getLocalConfig('wallpaper');
const wallpaper = wallpaperInfo['bing'][0];
</script>

<style lang="scss" scoped></style>
