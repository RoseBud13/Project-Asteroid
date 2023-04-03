import { defineStore } from 'pinia';
import useConfig from '@/config';

const { getLocalConfig } = useConfig();

export const useGlobal = defineStore('global', {
  state: () => ({
    isFullscreen: false,
    showDashboard: false,
    showDashboardMobile: false,
    deviceType: '',
    dashboardViewIndex: 0,
    dashboardViewLength: 2,
    searchEngine: '',
    searchPlaceholder: ''
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
    },
    setSearchEngine() {
      this.searchEngine =
        localStorage.getItem('search-engine') ||
        getLocalConfig('searchEngine') ||
        'bing';
      if (!localStorage.getItem('search-engine')) {
        localStorage.setItem('search-engine', this.searchEngine);
      }
    },
    changeSearchEngine(value) {
      this.searchEngine = value;
    },
    setSearchPlaceholder(option) {
      switch (option) {
        case 'bing':
          this.searchPlaceholder = 'searchbar.input.placeholder.bing';
          break;
        case 'google':
          this.searchPlaceholder = 'searchbar.input.placeholder.google';
          break;
        case 'baidu':
          this.searchPlaceholder = 'searchbar.input.placeholder.baidu';
          break;
      }
    }
  }
});
