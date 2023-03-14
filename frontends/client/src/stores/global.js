import { defineStore } from 'pinia';

export const useGlobal = defineStore('global', {
  state: () => ({
    isFullscreen: false,
    showDashboard: false,
    showDashboardMobile: false,
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
    toggleDashboardMobile() {
      this.showDashboardMobile = !this.showDashboardMobile;
    },
    setDeviceType(device) {
      if (device === 'PC' || device === 'mobile' || device === 'ios') {
        this.deviceType = device;
      } else {
        this.deviceType = '';
      }
    }
  }
});
