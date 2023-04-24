import { defineStore } from 'pinia';

export const useSideAppBoxStore = defineStore('sideAppBox', {
  state: () => ({
    showSideAppBox: false
  }),
  actions: {
    show() {
      this.showSideAppBox = true;
    },
    hide() {
      this.showSideAppBox = false;
    }
  }
});
