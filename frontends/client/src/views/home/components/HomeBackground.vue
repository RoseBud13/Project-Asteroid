<template>
  <Background
    ref="background"
    :wallpaperUrl="wallpaperList[currentWallpaper]"
    :videoUrl="videoWallpaper"
    preventUserSelect
  >
    <template #widgetbox>
      <SearchBar autofocus></SearchBar>
      <AstraAppBox
        :addNew="widgetApps.length === 0"
        :addShow="widgetApps.length < 10"
        :addBtnFlex="widgetApps.length > 5"
      >
        <AstraAppCard
          v-for="widgetApp in sortedWidgetApps"
          :key="widgetApp.id"
          :title="widgetApp.title"
          hasDelete
          @clickWidgetApp="
            handleOpenWidgetApp(
              widgetApp.urlRouter,
              widgetApp.title,
              widgetApp.external,
              widgetApp.embedded
            )
          "
          @delete="widgetboxStore.deleteWidgetApp(widgetApp.id)"
        >
          <template #appicon>
            <IconMusic v-if="widgetApp.icon === 'iconMusic'"></IconMusic>
            <!-- <IconCode v-else-if="widgetApp.icon === 'iconCode'"></IconCode> -->
            <EmojiMessage
              v-else-if="widgetApp.icon === 'iconMessage'"
            ></EmojiMessage>
            <img
              v-else
              :src="widgetApp.icon"
              :alt="widgetApp.title"
              style="height: 25px; object-fit: contain; pointer-events: none"
              onerror="if (this.src !== `https://b612-static-rsrcs-1306125602.cos.ap-shanghai.myqcloud.com/static-img%2Ffavicon_on_error.svg`) this.src = `https://b612-static-rsrcs-1306125602.cos.ap-shanghai.myqcloud.com/static-img%2Ffavicon_on_error.svg`;"
            />
          </template>
        </AstraAppCard>
      </AstraAppBox>
    </template>
    <template #sidebarLeft>
      <SideAppBox>
        <AstraApp
          icon="notes"
          :appTitle="$t('application.notes.title')"
          @click="appNotesStore.toggleNotes()"
        ></AstraApp>
      </SideAppBox>
    </template>
  </Background>
</template>

<script setup>
import Background from '@/components/background/index.vue';
import SearchBar from '@/components/gadgets/searchbar/index.vue';
import AstraAppBox from '@/components/gadgets/appbox/index.vue';
import SideAppBox from '@/components/gadgets/appbox/SideAppBox.vue';
import AstraAppCard from '@/components/basics/appcard/index.vue';
import AstraApp from '@/components/basics/appcard/AstraApp.vue';
import IconMusic from '@/components/icons/IconMusic.vue';
// import IconCode from '@/components/icons/IconCode.vue';
import EmojiMessage from '@/components/icons/EmojiMessage.vue';
import { useWidgetboxStore } from '@/stores/widgetbox';
import { useWallpaperStore } from '@/stores/wallpaper';
import { useModalStore } from '@/stores/modal';
import { useSideAppBoxStore } from '@/stores/sideAppBox';
import { useAppNotesStore } from '@/stores/appNotes';
import { storeToRefs } from 'pinia';
import { onMounted, onBeforeUnmount, computed, ref } from 'vue';

const background = ref(null);

const widgetboxStore = useWidgetboxStore();
const { widgetApps } = storeToRefs(widgetboxStore);

const wallpaperStore = useWallpaperStore();
const { currentWallpaper, wallpaperList, videoWallpaper } =
  storeToRefs(wallpaperStore);

const modalStore = useModalStore();

const sideAppBoxStore = useSideAppBoxStore();

const appNotesStore = useAppNotesStore();

const sortedWidgetApps = computed(() => {
  let unsorted = widgetApps.value;
  unsorted.forEach((element, index) => {
    element['index'] = index;
  });
  return unsorted.sort((a, b) => {
    if (a['index'] > b['index']) {
      return 1;
    }
    if (a['index'] < b['index']) {
      return -1;
    }
    return 0;
  });
});

const handleOpenWidgetApp = (url, title, isExternal, isEmbedded) => {
  if (isEmbedded && isExternal) {
    modalStore.openEmbeddedModal(url, title, true);
  } else if (!isEmbedded && isExternal) {
    window.open(url);
  }
};

onMounted(() => {
  wallpaperStore.initWallpaper();
  widgetboxStore.initWidgetApps();
  background.value.sidebarLeft.addEventListener('mouseover', () => {
    sideAppBoxStore.show();
  });
  background.value.sidebarLeft.addEventListener('mouseleave', () => {
    sideAppBoxStore.hide();
  });
});

onBeforeUnmount(() => {
  background.value.sidebarLeft.removeEventListener('mouseover', () => {
    sideAppBoxStore.show();
  });
  background.value.sidebarLeft.removeEventListener('mouseleave', () => {
    sideAppBoxStore.hide();
  });
});
</script>

<style lang="scss" scoped></style>
