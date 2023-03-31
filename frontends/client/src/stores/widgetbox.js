import { defineStore } from 'pinia';
import useConfig from '@/config';
import { Local } from '@/utils/storage';

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
    }
  }
});
