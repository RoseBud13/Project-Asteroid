import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    showModal: false,
    modalTitle: '',
    targetUrl: '',
    isEmbeddedFull: false,
    isConfirmed: false,
    checkConfirmOk: false,
    confirmButtonClicked: false,
    hasForm: false,
    hasCard: false,
    multiContent: false
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
      this.hasForm = false;
      this.hasCard = false;
      this.multiContent = false;
      this.isConfirmed = false;
      this.showModal = false;
    },
    openModal(title, hasForm, hasCard, multiContent) {
      this.modalTitle = title;
      this.showModal = true;
      this.hasForm = hasForm || false;
      this.hasCard = hasCard || false;
      this.multiContent = multiContent || false;
    },
    setCheckConfirmOk() {
      this.checkConfirmOk = true;
    },
    handleModalOK() {
      this.confirmButtonClicked = !this.confirmButtonClicked;
      if (this.checkConfirmOk) {
        this.isConfirmed = true;
        setTimeout(() => {
          this.closeModal();
          this.checkConfirmOk = false;
        }, 300);
      }
    }
  }
});
