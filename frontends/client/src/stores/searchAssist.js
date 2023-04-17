import { defineStore } from 'pinia';
import { fetchMoonshinerUrl } from '@/utils/request';

export const useSearchAssistStore = defineStore('searchAssist', {
  state: () => ({
    searchAssistList: [
      {
        name: '/于是转身向大海走去',
        alt: '/starry-eyed moonshiner',
        id: 'starry-eyed-moonshiner'
      },
      {
        name: '/便签 (开发中...)',
        alt: '/notes',
        id: 'notes'
      },
      {
        name: '/日历 (开发中...)',
        alt: '/calendar',
        id: 'calendar'
      },
      {
        name: '/天气 (开发中...)',
        alt: '/weather',
        id: 'weather'
      }
    ],
    moonshinerUrl: []
  }),
  actions: {
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
