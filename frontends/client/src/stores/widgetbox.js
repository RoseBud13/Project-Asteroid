import { defineStore } from 'pinia';
import useConfig from '@/config';
import { Local } from '@/utils/storage';
import { generateUID } from '@/utils/tool';
import { useFavicon } from '@/hooks/request';

const { getLocalConfig } = useConfig();
const { getFaviconUrl } = useFavicon();

export const useWidgetboxStore = defineStore('widgetbox', {
  state: () => ({
    showWidgetbox: false,
    widgetApps: [],
    astraWidgetApps: [
      {
        id: 'bubbleTurntable',
        external: true,
        embedded: true,
        urlRouter: 'https://www.b612.one/bubble-turntable',
        title: 'Bubble Turntable by 🍒',
        icon: 'iconMusic',
        tag: '唱片机'
      },
      {
        id: 'editor',
        external: true,
        embedded: true,
        urlRouter: 'https://www.b612.one/asteroid/web-editor',
        title: 'JS Editor by 🍒',
        icon: 'iconCode',
        tag: 'Editor'
      },
      {
        id: 'yuanshen',
        external: true,
        embedded: true,
        urlRouter: 'https://bbs.mihoyo.com/ys/strategy',
        title: '原神观测枢',
        icon: 'src/assets/image/ys-logo.png',
        tag: '观测枢'
      },
      {
        id: 'miyoushe',
        external: true,
        embedded: true,
        urlRouter: 'https://www.miyoushe.com/ys/',
        title: '米游社',
        icon: 'src/assets/image/mhy.webp',
        tag: '米游社'
      },
      {
        id: 'doubanmovie',
        external: true,
        embedded: true,
        urlRouter: 'https://m.douban.com/movie/',
        title: '豆瓣电影',
        icon: 'https://douban.com/favicon.ico',
        tag: '豆瓣电影'
      },
      {
        id: 'doubanmusic',
        external: true,
        embedded: true,
        urlRouter: 'https://m.douban.com/music/',
        title: '音乐-豆瓣',
        icon: 'https://douban.com/favicon.ico',
        tag: '豆瓣音乐'
      },
      {
        id: 'doubanbook',
        external: true,
        embedded: true,
        urlRouter: 'https://m.douban.com/book/',
        title: '图书-豆瓣',
        icon: 'https://douban.com/favicon.ico',
        tag: '豆瓣图书'
      },
      {
        id: 'weibo',
        external: true,
        embedded: true,
        urlRouter: 'https://m.weibo.cn/',
        title: '微博',
        icon: 'https://weibo.com/favicon.ico',
        tag: '微博'
      }
      // {
      //   id: 'yige',
      //   external: true,
      //   embedded: false,
      //   urlRouter: 'http://wufazhuce.com/',
      //   title: 'ONE·一个',
      //   icon: 'https://b612.one/oneapi/img/favicon.ico',
      //   tag: 'ONE·一个'
      // }
    ]
  }),
  getters: {},
  actions: {
    toggleWidgetbox() {
      this.showWidgetbox = !this.showWidgetbox;
    },
    initWidgetApps() {
      this.widgetApps =
        Local.get('widget-apps') || getLocalConfig('widgetApps') || [];
      if (!Local.get('widget-apps')) {
        Local.set('widget-apps', this.widgetApps);
      }
    },
    addWidgetApp(value) {
      if (this.widgetApps.length < 10) {
        let newWidgetApps = {
          id: generateUID(5),
          external: true,
          embedded: false,
          urlRouter: value.url,
          title: value.title,
          icon: getFaviconUrl(value.url)
        };
        this.widgetApps.push(newWidgetApps);
        let localWidgetApps = Local.get('widget-apps') || [];
        localWidgetApps.push(newWidgetApps);
        Local.set('widget-apps', localWidgetApps);
      } else {
        console.log('apps maximum');
      }
    },
    addAstraWidgetApp(id) {
      let newWidgetApp =
        this.astraWidgetApps.find(item => item.id === id) || null;
      let ifExisted = this.widgetApps.find(item => item.id === id) || null;
      if (newWidgetApp && !ifExisted) {
        this.widgetApps.push(newWidgetApp);
        let localWidgetApps = Local.get('widget-apps') || [];
        localWidgetApps.push(newWidgetApp);
        Local.set('widget-apps', localWidgetApps);
      }
    },
    deleteWidgetApp(id) {
      if (this.widgetApps.length > 0) {
        let theIndex = this.widgetApps.map(obj => obj.id).indexOf(id);
        this.widgetApps.splice(theIndex, 1);
        Local.set('widget-apps', this.widgetApps);
      }
    }
  }
});
