import { defineStore } from 'pinia';

export const useInputStore = defineStore('input', {
  state: () => ({
    isNested: false,
    isPswd: false,
    type: 'text',
    placeholder: '',
    nestedInputInfo: []
  }),
  actions: {
    setNestedInfo(value) {
      this.nestedInputInfo = value;
    },
    clearNestedInfo() {
      this.nestedInputInfo = [];
    }
  }
});
