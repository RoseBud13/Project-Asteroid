import { defineStore } from 'pinia';

export const useGlobe = defineStore('globe', {
  state: () => ({ isFullscreen: false }),
  getters: {},
  actions: {
    toggleFullscreen(fullscreenState) {
      if (fullscreenState) {
        this.isFullscreen = fullscreenState;
      } else {
        this.isFullscreen = !this.isFullscreen;
      }
    }
  }
});
