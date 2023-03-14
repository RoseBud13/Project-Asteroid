<template>
  <RouterView />
</template>

<script setup>
import { watch, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import useLocale from '@/hooks/locale';
import { useGlobal } from '@/stores/global';
import { useUserAgent } from '@/utils/browser';

const { i18, currentLocale } = useLocale();
const globalStore = useGlobal();
const { getDeviceType } = useUserAgent();

document.title = i18.t('global.title');

watch(currentLocale, () => {
  document.title = i18.t('global.title');
});

onMounted(() => {
  globalStore.setDeviceType(getDeviceType());
});
</script>

<style lang="scss" scoped></style>
