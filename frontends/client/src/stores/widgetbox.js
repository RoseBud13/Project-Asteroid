import { defineStore } from 'pinia';

export const useWidgetboxStore = defineStore('widgetbox', {
  state: () => ({ showWidgetbox: false }),
  getters: {},
  actions: {
    toggleWidgetbox() {
      this.showWidgetbox = !this.showWidgetbox;
    }
  }
});
