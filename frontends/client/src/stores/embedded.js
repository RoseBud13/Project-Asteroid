import { defineStore } from 'pinia';

export const useEmbedded = defineStore('embedded', {
  state: () => ({
    showEmbedded: false,
    targetUrl: '',
    embeddedTitle: '',
    isEmbeddedFull: false
  }),
  actions: {
    openEmbeddedModal(url, title, isFull) {
      this.targetUrl = url;
      this.embeddedTitle = title;
      this.isEmbeddedFull = isFull;
      this.showEmbedded = true;
    },
    closeEmbeddedModal() {
      this.targetUrl = '';
      this.embeddedTitle = '';
      this.isEmbeddedFull = false;
      this.showEmbedded = false;
    }
  }
});
