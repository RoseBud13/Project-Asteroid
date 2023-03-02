<template>
  <Background :wallpaperUrl="wallpaper" preventUserSelect>
    <template #homepage-utilities>
      <SearchBar autofocus></SearchBar>
    </template>
  </Background>
  <Navbar>
    <template #left>
      <h2>{{ $t('home.title') }}</h2>
    </template>
    <template #mid>
      <ClockItem blink></ClockItem>
    </template>
    <template #right>
      <AstraDropdown>
        <AstraButton>A/文</AstraButton>
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
      <AstraButton href="https://github.com/RoseBud13/Project-Asteroid"
        >GitHub</AstraButton
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
import useConfig from '../config';

const locales = [...LOCALE_OPTIONS];
const { changeLocale } = useLocale();
const { getLocalConfig } = useConfig();

const wallpaperInfo = getLocalConfig('wallpaper');
const wallpaper = wallpaperInfo['bing'][0];
</script>

<style lang="scss" scoped></style>
