import { defineStore } from 'pinia';
import useConfig from '@/config';

const { getLocalConfig } = useConfig();

export const useWallpaperStore = defineStore('wallpaper', {
  state: () => ({
    currentWallpaper: '',
    wallpaperList: {},
    videoWallpaper: null
  }),
  actions: {
    initWallpaper(data) {
      this.currentWallpaper =
        localStorage.getItem('wallpaper') ||
        getLocalConfig('defaultWallpaper') ||
        'bing';
      if (!localStorage.getItem('wallpaper')) {
        localStorage.setItem('wallpaper', this.currentWallpaper);
      }
      const defaultWallpaperList = getLocalConfig('wallpaper');
      defaultWallpaperList['wallpaper.oneapp'] = data.wallpaperUrl;
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
    }
  }
});
