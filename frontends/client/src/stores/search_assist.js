import { defineStore } from 'pinia';

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
    moonshinerUrl:
      'https://b612-static-rsrcs-1306125602.cos.ap-shanghai.myqcloud.com/media%2Fstarry-eyed-moonshiner.mp4'
  })
});
