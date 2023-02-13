<template>
  <div>
    <ul>
      <li
        v-for="item in locales"
        :key="item.value"
        @click="changeLocale(item.value)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { LOCALE_OPTIONS } from '@/locale';
import useLocale from '@/hooks/locale';

const locales = [...LOCALE_OPTIONS];
const { changeLocale } = useLocale();
</script>
<script>
export default {
  name: 'NavbarItem'
};
</script>

<style lang="scss" scoped></style>
