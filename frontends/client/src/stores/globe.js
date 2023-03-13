import { defineStore } from 'pinia';

export const useGlobe = defineStore('globe', {
  state: () => ({
    isFullscreen: false,
    showDashboard: false
  }),
  getters: {},
  actions: {
    toggleFullscreen(fullscreenState) {
      if (fullscreenState) {
        this.isFullscreen = fullscreenState;
      } else {
        this.isFullscreen = !this.isFullscreen;
      }
    },
    toggleDashboard() {
      this.showDashboard = !this.showDashboard;
    }
  }
});
