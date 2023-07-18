import { defineStore } from 'pinia';

import { fetchOneDailyQuote } from '@/utils/request';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    dailyQuote: {}
  }),
  actions: {
    initDashboardWidgets() {
      fetchOneDailyQuote().then(data => {
        this.dailyQuote.content = data.content;
        this.dailyQuote.info = data.info;
      });
    }
  }
});
