<template>
  <RouterView />
</template>

<script setup>
import { watch, onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';
import useLocale from '@/hooks/locale';
import { useGlobal } from '@/stores/global';
import { useUserAgent } from '@/utils/browser';

const { i18, currentLocale } = useLocale();
const globalStore = useGlobal();
const { getDeviceType } = useUserAgent();

const setDeviceVh = () => {
  if (getDeviceType() === 'ios') {
    document.documentElement.style.setProperty('--90vh', '90dvh');
    document.documentElement.style.setProperty('--100vh', '100dvh');
  } else {
    document.documentElement.style.setProperty('--90vh', '90vh');
    document.documentElement.style.setProperty('--100vh', '100vh');
  }
};

document.title = i18.t('global.title');

watch(currentLocale, () => {
  document.title = i18.t('global.title');
});

onBeforeMount(() => {
  globalStore.setDeviceType(getDeviceType());
  setDeviceVh();
});
</script>

<style lang="scss" scoped></style>
