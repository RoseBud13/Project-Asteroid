import { createI18n } from 'vue-i18n';
import zhCN from './lang/zh-CN';
import enUS from './lang/en-US';

export const LOCALE_OPTIONS = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
];

const defaultLocale = localStorage.getItem('locale') || 'zh-CN';

// Create i18n instance with options
const i18n = createI18n({
  legacy: false, // use Composition API
  locale: defaultLocale, // set locale
  fallbackLocale: 'zh-CN', // set fallback locale
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
});

export default i18n;
