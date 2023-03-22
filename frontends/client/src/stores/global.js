import { defineStore } from 'pinia';

export const useGlobal = defineStore('global', {
  state: () => ({
    isFullscreen: false,
    showDashboard: false,
    showDashboardMobile: false,
    deviceType: '',
    dashboardViewIndex: 0,
    dashboardViewLength: 2,
    dashboardContentOffset: 0
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
      if (this.dashboardContentOffset === 0) {
        this.dashboardContentOffset = 1;
      } else {
        this.dashboardContentOffset = 0;
      }
    },
    setDeviceType(device) {
      if (device === 'PC' || device === 'mobile' || device === 'ios') {
        this.deviceType = device;
      } else {
        this.deviceType = '';
      }
    },
    nextDashboardView() {
      if (this.dashboardViewIndex < this.dashboardViewLength - 1) {
        this.dashboardViewIndex++;
      }
    },
    prevDashboardView() {
      if (this.dashboardViewIndex > 0) {
        this.dashboardViewIndex--;
      }
    }
  }
});
