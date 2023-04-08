import { defineStore } from 'pinia';
import useConfig from '@/config';
import { fetchOneWallpaperUrl } from '@/utils/request';

const { getLocalConfig } = useConfig();

export const useWallpaperStore = defineStore('wallpaper', {
  state: () => ({
    currentWallpaper: '',
    wallpaperList: {},
    defaultWallpaperList: {
      'wallpaper.bing': 'https://api.dujin.org/bing/1920.php',
      'wallpaper.oneapp':
        'https://b612.one/oneapi/img/Fh5NZm2cRYJtvIurGJ6sfW-bGP3F',
      'wallpaper.ghibli': 'https://api.dujin.org/pic/ghibli',
      'wallpaper.yuanshen': 'https://api.dujin.org/pic/yuanshen/',
      'wallpaper.color': ''
    },
    videoWallpaper: null
  }),
  actions: {
    initWallpaper() {
      this.currentWallpaper =
        localStorage.getItem('wallpaper') ||
        getLocalConfig('defaultWallpaper') ||
        'bing';
      this.wallpaperList =
        getLocalConfig('wallpaper') || this.defaultWallpaperList;
      fetchOneWallpaperUrl().then(res => {
        this.wallpaperList['wallpaper.oneapp'] = res;
      });
      if (!localStorage.getItem('wallpaper')) {
        localStorage.setItem('wallpaper', this.currentWallpaper);
      }
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
