import { defineStore } from 'pinia';

export const useAppNotesStore = defineStore('appNotes', {
  state: () => ({
    showNotes: false,
    enlarged: false
  }),
  actions: {
    toggleNotes() {
      this.showNotes = !this.showNotes;
      this.enlarged = false;
    },
    toggleEnlarge() {
      this.enlarged = !this.enlarged;
    }
  }
});
