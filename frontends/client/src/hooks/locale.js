import { computed, inject } from 'vue';
import { useI18n } from 'vue-i18n';

export default function useLocale() {
  const i18 = useI18n();
  const toast = inject('toast');
  const currentLocale = computed(() => {
    return i18.locale.value;
  });
  const changeLocale = value => {
    i18.locale.value = value;
    localStorage.setItem('locale', value);
    toast(i18.t('navbar.action.locale'));
    // Message.success(i18.t('navbar.action.locale'));
  };
  return {
    i18,
    currentLocale,
    changeLocale
  };
}
