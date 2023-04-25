import { defineStore } from 'pinia';
import { fetchMoonshinerUrl } from '@/utils/request';

export const useSearchAssistStore = defineStore('searchAssist', {
  state: () => ({
    showSearchAssist: false,
    searchAssistList: [
      {
        name: 'searchbar.assist.shortcut.notes',
        matchText: '/便签',
        alt: '/notes',
        alt1: '/Notes',
        id: 'notes'
      },
      {
        name: 'searchbar.assist.shortcut.calendar',
        matchText: '/日历',
        alt: '/calendar',
        alt1: '/Calendar',
        id: 'calendar'
      },
      {
        name: 'searchbar.assist.shortcut.weather',
        matchText: '/天气',
        alt: '/weather',
        alt1: '/Weather',
        id: 'weather'
      },
      {
        name: 'searchbar.assist.shortcut.bonus',
        matchText: '/于是转身向大海走去',
        alt: '/starry-eyed moonshiner',
        alt1: '/Starry-eyed moonshiner',
        id: 'starry-eyed-moonshiner'
      }
    ],
    moonshinerUrl: []
  }),
  actions: {
    toggleShowSearchAssist(value) {
      if (value !== 'undefined') {
        this.showSearchAssist = value;
      } else {
        this.showSearchAssist = !this.showSearchAssist;
      }
    },
    initMoonshiner() {
      fetchMoonshinerUrl().then(res => {
        this.moonshinerUrl = res;
      });
      // this.moonshinerUrl = [
      //   'https://b612-static-rsrcs-1306125602.cos.ap-shanghai.myqcloud.com/media%2Fstarry-eyed-moonshiner.mp4',
      //   'https://b612-static-rsrcs-1306125602.cos.ap-shanghai.myqcloud.com/media/AHY%20-%20Life%20in%202019.mp4',
      //   'https://b612-static-rsrcs-1306125602.cos.ap-shanghai.myqcloud.com/media/She%20walks%20in%20beauty.mp4',
      //   'https://b612-static-rsrcs-1306125602.cos.ap-shanghai.myqcloud.com/media/%E5%8E%9F%E6%9D%A5%E5%8A%A8%E6%BC%AB%E9%87%8C%E7%9A%84%E4%B8%96%E7%95%8C%E7%9C%9F%E5%AE%9E%E5%AD%98%E5%9C%A8.mp4',
      //   'https://b612-static-rsrcs-1306125602.cos.ap-shanghai.myqcloud.com/media/%E8%87%AA%E7%94%B1%E6%98%AF%E4%B8%80%E5%9C%BA%E5%9D%A0%E5%85%A5%EF%BC%8C%E5%9D%A0%E5%85%A5%E5%9F%8E%E5%B8%82%E8%BE%B9%E7%BC%98%EF%BC%8C%E5%9D%A0%E5%85%A5%E6%97%A0%E5%B0%BD%E7%9A%84%E6%A2%A6%E4%B8%AD.mp4',
      //   'https://b612-static-rsrcs-1306125602.cos.ap-shanghai.myqcloud.com/media/%E9%9F%A6%E6%96%AF%C2%B7%E5%AE%89%E5%BE%B7%E6%A3%AE.mp4'
      // ];
    }
  }
});
