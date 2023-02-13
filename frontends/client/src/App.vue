<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { RouterView } from 'vue-router';
import useLocale from '@/hooks/locale';

const { i18, currentLocale } = useLocale();

document.title = i18.t('global.title');

watch(currentLocale, () => {
  document.title = i18.t('global.title');
});
</script>

<style lang="scss" scoped></style>
