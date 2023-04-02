import { defineStore } from 'pinia';
import useConfig from '@/config';
import { Local } from '@/utils/storage';
import { generateUID } from '@/utils/tool';

const { getLocalConfig } = useConfig();

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
        tag: 'Music'
      },
      {
        id: 'yuanshen',
        external: true,
        embedded: true,
        urlRouter: 'https://bbs.mihoyo.com/ys/strategy',
        title: '原神观测枢',
        icon: 'src/assets/image/mhy.webp',
        tag: '观测枢'
      },
      {
        id: 'bilibili',
        external: true,
        embedded: false,
        urlRouter: 'https://bilibili.com',
        title: 'Bilibili',
        icon: 'src/assets/image/bilibili.svg',
        tag: 'Bilibili'
      },
      {
        id: 'editor',
        external: true,
        embedded: true,
        urlRouter: 'https://www.b612.one/web-editor',
        title: 'JS Editor',
        icon: 'iconCode',
        tag: 'Editor'
      }
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
          icon: 'src/assets/image/b612_logo_256.png'
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
