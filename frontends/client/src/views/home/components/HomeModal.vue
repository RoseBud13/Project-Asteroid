<template>
  <AstraModal
    :fullscreen="isEmbeddedFull"
    :visible="showModal"
    :embeddedUrl="targetUrl"
    :hasForm="hasForm"
    :hasCard="hasCard"
    :multiContent="multiContent"
    @cancel="modalStore.closeModal()"
  >
    <template #left>
      <IconArrowLeft
        v-if="targetUrl"
        @click="modalStore.closeModal()"
        style="cursor: pointer"
      ></IconArrowLeft>
    </template>
    <template #title>{{ $t(modalTitle) }}</template>
    <template #right>
      <a
        v-if="targetUrl"
        :href="targetUrl"
        target="_blank"
        style="height: 18px"
      >
        <IconArrowExternal @click="modalStore.closeModal()"></IconArrowExternal>
      </a>
      <IconClose
        v-else
        @click="modalStore.closeModal()"
        style="cursor: pointer"
      ></IconClose>
    </template>
    <template #modalcard>
      <AstraAppCard
        v-for="widgetApp in astraWidgetApps"
        :key="widgetApp.id"
        :title="widgetApp.title"
        @clickWidgetApp="widgetboxStore.addAstraWidgetApp(widgetApp.id)"
        @click="modalStore.closeModal()"
      >
        <template #appicon>
          <IconMusic v-if="widgetApp.icon === 'iconMusic'"></IconMusic>
          <IconCode v-else-if="widgetApp.icon === 'iconCode'"></IconCode>
          <img
            v-else
            :src="widgetApp.icon"
            :alt="widgetApp.title"
            style="height: 25px; object-fit: contain"
          />
        </template>
        <template #apptag>
          {{ widgetApp.tag }}
        </template>
      </AstraAppCard>
    </template>
    <template #footer>
      <AstraButton size="mini" @click="modalStore.closeModal()">{{
        $t('modal.button.cancel')
      }}</AstraButton>
      <AstraButton
        type="emerald"
        size="mini"
        @click="modalStore.handleModalOK()"
        >{{ $t('modal.button.confirm') }}</AstraButton
      >
    </template>
  </AstraModal>
</template>

<script setup>
import AstraModal from '@/components/basics/modal/index.vue';
import AstraButton from '@/components/basics/button/index.vue';
import AstraAppCard from '@/components/basics/appcard/index.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconArrowExternal from '@/components/icons/IconArrowExternal.vue';
import IconMusic from '@/components/icons/IconMusic.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconCode from '@/components/icons/IconCode.vue';
import { useModalStore } from '@/stores/modal';
import { useWidgetboxStore } from '@/stores/widgetbox';
import { storeToRefs } from 'pinia';

const modalStore = useModalStore();
const {
  showModal,
  targetUrl,
  modalTitle,
  isEmbeddedFull,
  hasForm,
  hasCard,
  multiContent
} = storeToRefs(modalStore);

const widgetboxStore = useWidgetboxStore();
const { astraWidgetApps } = storeToRefs(widgetboxStore);
</script>

<style lang="scss" scoped></style>
