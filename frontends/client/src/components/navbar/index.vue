<template>
  <div>
    <ul>
      <li v-for="item in locales" :key="item.value">
        <AstroButton @click="changeLocale(item.value)">{{
          item.label
        }}</AstroButton>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { LOCALE_OPTIONS } from '@/locale';
import useLocale from '@/hooks/locale';
import AstroButton from '@/components/basics/button/index.vue';

const locales = [...LOCALE_OPTIONS];
const { changeLocale } = useLocale();
</script>
<script>
export default {
  name: 'NavbarItem'
};
</script>

<style lang="scss" scoped></style>
