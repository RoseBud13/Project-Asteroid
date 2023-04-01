import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    showModal: false,
    modalTitle: '',
    targetUrl: '',
    isEmbeddedFull: false,
    isForm: false,
    isConfirmed: false
  }),
  actions: {
    openEmbeddedModal(url, title, isFull) {
      this.targetUrl = url;
      this.modalTitle = title;
      this.isEmbeddedFull = isFull;
      this.showModal = true;
    },
    closeModal() {
      this.targetUrl = '';
      this.modalTitle = '';
      this.isEmbeddedFull = false;
      this.isForm = false;
      this.showModal = false;
      this.isConfirmed = false;
    },
    openFormModal(title) {
      this.modalTitle = title;
      this.showModal = true;
      this.isForm = true;
    },
    handleModalOK() {
      this.isConfirmed = true;
      setTimeout(() => {
        this.closeModal();
      }, 300);
    }
  }
});
