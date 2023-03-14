import { defineStore } from 'pinia';

export const useGlobal = defineStore('global', {
  state: () => ({
    isFullscreen: false,
    showDashboard: false,
    deviceType: ''
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
    },
    setDeviceType(device) {
      if (device === 'PC' || device === 'mobile') {
        this.deviceType = device;
      } else {
        this.deviceType = '';
      }
      console.log(this.deviceType);
    }
  }
});
