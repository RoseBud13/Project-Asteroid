<template>
  <Navbar>
    <template #left>
      <router-link to="/about">
        <h3
          :style="{
            color: '#fff'
          }"
        >
          {{ tagline }}
        </h3>
      </router-link>
    </template>
    <template #mid>
      <ClockItem blink :textColor="'#fff'"></ClockItem>
    </template>
    <template #right>
      <AstraDropdown>
        <template #trigger>
          <AstraButton
            type="nav"
            :style="{
              'font-size': '20px',
              color: '#fff'
            }"
          >
            <IconLanguage></IconLanguage>
          </AstraButton>
        </template>
        <template #content>
          <AstraDropdownOption
            v-for="item in locales"
            :key="item.value"
            :style="{ color: item.value === currentLocale ? '#75a297' : '' }"
            @click="changeLocale(item.value)"
          >
            {{ item.label }}
          </AstraDropdownOption>
        </template>
      </AstraDropdown>
      <AstraDropdown
        :rightEdge="deviceType !== 'PC' && deviceType !== '' ? true : false"
      >
        <template #trigger>
          <AstraButton
            type="nav"
            :style="{
              'font-size': '20px',
              color: '#fff'
            }"
          >
            <IconWallpaper></IconWallpaper>
          </AstraButton>
        </template>
        <template #content>
          <AstraDropdownOption
            v-for="item in Object.keys(wallpaperList)"
            :key="item"
            :style="{ color: item === currentWallpaper ? '#75a297' : '' }"
            @click="wallpaperStore.changeWallpaper(item)"
          >
            {{ $t(item) }}
          </AstraDropdownOption>
        </template>
      </AstraDropdown>
      <AstraButton
        type="nav"
        v-if="deviceType === 'PC' || deviceType === ''"
        :style="{
          'font-size': '25px',
          color: '#fff'
        }"
        :title="
          !isFullscreen
            ? $t('navbar.action.enterFullscreen')
            : $t('navbar.action.exitFullscreen')
        "
      >
        <IconFullscreen
          v-if="!isFullscreen"
          @click="globalStore.enterFullscreen()"
        ></IconFullscreen>
        <IconFullscreenExit
          v-else
          @click="globalStore.exitFullscreen()"
        ></IconFullscreenExit>
      </AstraButton>
    </template>
  </Navbar>
</template>

<script setup>
import Navbar from '@/components/basics/navbar/index.vue';
import ClockItem from '@/components/gadgets/clock/ClockItem.vue';
import AstraDropdown from '@/components/basics/dropdown/index.vue';
import AstraDropdownOption from '@/components/basics/dropdown/DropdownOption.vue';
import AstraButton from '@/components/basics/button/index.vue';
import IconFullscreen from '@/components/icons/IconFullscreen.vue';
import IconFullscreenExit from '@/components/icons/IconFullscreenExit.vue';
import IconLanguage from '@/components/icons/IconLanguage.vue';
import IconWallpaper from '@/components/icons/IconWallpaper.vue';
import { LOCALE_OPTIONS } from '@/locale';
import useLocale from '@/hooks/locale';
import { useGlobal } from '@/stores/global';
import { useWallpaperStore } from '@/stores/wallpaper';
import { storeToRefs } from 'pinia';

const globalStore = useGlobal();
const { isFullscreen, deviceType, tagline } = storeToRefs(globalStore);

const locales = [...LOCALE_OPTIONS];
const { changeLocale, currentLocale } = useLocale();

const wallpaperStore = useWallpaperStore();
const { currentWallpaper, wallpaperList } = storeToRefs(wallpaperStore);
</script>

<style lang="scss" scoped></style>
