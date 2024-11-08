import { defineStore } from 'pinia';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    dailyQuote: {}
  }),
  actions: {
    initOneDailyQuote(data) {
      this.dailyQuote.content = data.dailyQuoteContent;
      this.dailyQuote.info = data.dailyQuoteInfo;
    }
  }
});
