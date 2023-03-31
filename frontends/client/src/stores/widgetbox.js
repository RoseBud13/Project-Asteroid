import { defineStore } from 'pinia';
import useConfig from '@/config';
import { Local } from '@/utils/storage';
import { generateUID } from '@/utils/tool';

const { getLocalConfig } = useConfig();

export const useWidgetboxStore = defineStore('widgetbox', {
  state: () => ({
    showWidgetbox: false,
    widgetApps: []
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
          icon: 'src/assets/image/bilibili.svg'
        };
        this.widgetApps.push(newWidgetApps);
        let localWidgetApps = Local.get('widget-apps') || [];
        localWidgetApps.push(newWidgetApps);
        Local.set('widget-apps', localWidgetApps);
      } else {
        console.log('apps maximum');
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
