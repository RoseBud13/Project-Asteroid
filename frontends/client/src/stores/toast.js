import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', {
  state: () => ({
    toastList: []
  }),
  actions: {
    addToastList(data) {
      this.toastList.push(data);
    },
    removeToastList(data) {
      this.toastList = this.toastList.filter(item => item !== data);
    }
  }
});
