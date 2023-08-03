import { defineStore } from 'pinia';
import useConfig from '@/config';

const { getLocalConfig } = useConfig();

export const useWallpaperStore = defineStore('wallpaper', {
  state: () => ({
    currentWallpaper: '',
    wallpaperList: {},
    videoWallpaper: null,
    wallpaperBrightness: ''
  }),
  actions: {
    initWallpaper(oneAppData) {
      this.currentWallpaper =
        localStorage.getItem('wallpaper') ||
        getLocalConfig('defaultWallpaper') ||
        'bing';
      if (!localStorage.getItem('wallpaper')) {
        localStorage.setItem('wallpaper', this.currentWallpaper);
      }
      const defaultWallpaperList = getLocalConfig('wallpaper');
      if (oneAppData) {
        defaultWallpaperList['wallpaper.oneapp'] = oneAppData.wallpaperUrl;
      }
      this.wallpaperList = defaultWallpaperList;
    },
    changeWallpaper(value) {
      this.currentWallpaper = value;
      localStorage.setItem('wallpaper', this.currentWallpaper);
    },
    setVideoWallpaper(url) {
      if (url) {
        this.videoWallpaper = url;
      } else {
        this.videoWallpaper = null;
      }
    },
    setWallpaperBrightness(data) {
      this.wallpaperBrightness = data;
    }
  }
});
