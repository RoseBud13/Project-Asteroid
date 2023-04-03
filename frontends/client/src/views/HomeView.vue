<template>
  <div class="homepage-wrapper" ref="homepage">
    <Background :wallpaperUrl="wallpaper" preventUserSelect>
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
              <IconCode v-else-if="widgetApp.icon === 'iconCode'"></IconCode>
              <img
                v-else
                :src="widgetApp.icon"
                :alt="widgetApp.title"
                style="height: 25px; object-fit: contain"
              />
            </template>
          </AstraAppCard>
        </AstraAppBox>
      </template>
    </Background>
    <Navbar>
      <template #left>
        <h3>{{ tagline }}</h3>
      </template>
      <template #mid>
        <ClockItem blink textColor="#fff"></ClockItem>
      </template>
      <template #right>
        <AstraDropdown>
          <template #trigger>
            <AstraButton type="nav" style="font-size: 20px">
              <IconLanguage></IconLanguage>
            </AstraButton>
          </template>
          <template #content>
            <AstraDropdownOption
              v-for="item in locales"
              :key="item.value"
              :style="{ color: item.value === currentLocale ? '#75a297' : '' }"
              @click="changeLocale(item.value)"
            >
              {{ item.label }}
            </AstraDropdownOption>
          </template>
        </AstraDropdown>
        <AstraButton
          type="nav"
          href="https://github.com/RoseBud13/Project-Asteroid"
          style="font-size: 20px"
          title="Project Asteroid"
        >
          <IconGithub></IconGithub>
        </AstraButton>
        <AstraButton
          type="nav"
          v-if="deviceType === 'PC' || deviceType === ''"
          style="font-size: 20px"
          :title="!isFullscreen ? 'open fullscreen' : 'exit fullscreen'"
        >
          <IconFullscreen
            v-if="!isFullscreen"
            @click="openFullscreen()"
          ></IconFullscreen>
          <IconFullscreenExit
            v-else
            @click="closeFullscreen()"
          ></IconFullscreenExit>
        </AstraButton>
      </template>
    </Navbar>
    <HomeDashboard ref="dashboard"></HomeDashboard>
    <Transition name="fade">
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
        <template #title>{{ modalTitle }}</template>
        <template #right>
          <a
            v-if="targetUrl"
            :href="targetUrl"
            target="_blank"
            style="height: 18px"
          >
            <IconArrowExternal
              @click="modalStore.closeModal()"
            ></IconArrowExternal>
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
          <AstraButton size="mini" @click="modalStore.closeModal()"
            >Cancel</AstraButton
          >
          <AstraButton
            type="emerald"
            size="mini"
            @click="modalStore.handleModalOK()"
            >OK</AstraButton
          >
        </template>
      </AstraModal>
    </Transition>
  </div>
</template>

<script setup>
import Background from '@/components/background/index.vue';
import Navbar from '@/components/navbar/index.vue';
import HomeDashboard from '@/components/dashboard/index.vue';
import ClockItem from '@/components/materials/ClockItem.vue';
import AstraDropdown from '@/components/basics/dropdown/index.vue';
import AstraDropdownOption from '@/components/basics/dropdown/dropdown-option.vue';
import AstraButton from '@/components/basics/button/index.vue';
import SearchBar from '@/components/materials/search-bar/index.vue';
import AstraModal from '@/components/basics/modal/index.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconArrowExternal from '@/components/icons/IconArrowExternal.vue';
import IconMusic from '@/components/icons/IconMusic.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconCode from '@/components/icons/IconCode.vue';
import IconFullscreen from '@/components/icons/IconFullscreen.vue';
import IconFullscreenExit from '@/components/icons/IconFullscreenExit.vue';
import IconGithub from '@/components/icons/IconGithub.vue';
import IconLanguage from '@/components/icons/IconLanguage.vue';
import AstraAppBox from '@/components/materials/app-box/index.vue';
import AstraAppCard from '@/components/basics/app-card/index.vue';
import { LOCALE_OPTIONS } from '@/locale';
import useLocale from '@/hooks/locale';
import useConfig from '@/config';
import { useFullscreen } from '@/utils/browser';
import { useGlobal } from '@/stores/global';
import { useModalStore } from '@/stores/modal';
import { useWidgetboxStore } from '@/stores/widgetbox';
import { storeToRefs } from 'pinia';
import { ref, onMounted, onUnmounted, computed } from 'vue';

const homepage = ref(null);
const dashboard = ref(null);

const { openFullscreen, closeFullscreen } = useFullscreen();
const globalStore = useGlobal();
const { isFullscreen, deviceType, showDashboardMobile } =
  storeToRefs(globalStore);

const locales = [...LOCALE_OPTIONS];
const { changeLocale, currentLocale } = useLocale();
const { getLocalConfig } = useConfig();

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
const { widgetApps, astraWidgetApps } = storeToRefs(widgetboxStore);

const wallpaperInfo = getLocalConfig('wallpaper');
const wallpaper = wallpaperInfo['bing'][0];

const scrollTop = ref(0);
const scrollStart = ref(0);
const target = ref(); // distence of toggling dashbaord
const scrollTimeoutTime = ref(800); // 0.8s is the minimum scroll interval to act as debounce
const touchStartY = ref(0); // 触摸位置
const touchEndY = ref(0); // 结束位置
const tagline = ref(getLocalConfig('tagline'));

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

const setSize = () => {
  target.value = 0.9 * homepage.value.clientHeight; // dsshboard initial top 90vh
};

const handleScroll = event => {
  scrollTop.value = event.target.scrollTop;
  if (scrollTop.value - scrollStart.value > 1) {
    homepage.value.removeEventListener('scroll', handleScroll);
    homepage.value.scroll({
      top: target.value,
      left: 0,
      behavior: 'smooth'
    });
    scrollStart.value = target.value;
    globalStore.toggleDashboard();
  } else if (scrollStart.value - scrollTop.value > 5) {
    homepage.value.removeEventListener('scroll', handleScroll);
    homepage.value.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    scrollStart.value = 0;
    globalStore.toggleDashboard();
  }
};

const handleScrollEnd = () => {
  homepage.value.removeEventListener('scroll', handleScrollEnd);
  let scrollTimeout;
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    homepage.value.addEventListener('scroll', handleScroll);
    homepage.value.addEventListener('scroll', handleScrollEnd);
  }, scrollTimeoutTime.value);
};

const handleTouchStart = event => {
  touchStartY.value = event.targetTouches[0].clientY;
  touchEndY.value = 0;
};

const handleTouchMove = event => {
  touchEndY.value = event.targetTouches[0].clientY;
};

const handleTouchEnd = () => {
  if (showDashboardMobile.value) {
    // touch down distance should be more than 250 to trigger toggle
    if (touchEndY.value && touchEndY.value - touchStartY.value > 250) {
      globalStore.toggleDashboardMobile();
    }
  } else {
    if (touchEndY.value && touchEndY.value - touchStartY.value < -10) {
      globalStore.toggleDashboardMobile();
    }
  }
};

const setScrollOrTouch = () => {
  if (deviceType.value === 'PC' || deviceType.value === '') {
    homepage.value.addEventListener('scroll', handleScroll);
    homepage.value.addEventListener('scroll', handleScrollEnd);
  } else {
    document.documentElement.style.overflow = 'hidden';
    homepage.value.style.overflowY = 'hidden';
    dashboard.value.dashboardComp.addEventListener(
      'touchstart',
      handleTouchStart
    );
    dashboard.value.dashboardComp.addEventListener(
      'touchmove',
      handleTouchMove
    );
    dashboard.value.dashboardComp.addEventListener('touchend', handleTouchEnd);
  }
};

const removeScrollOrTouch = () => {
  if (deviceType.value === 'PC' || deviceType.value === '') {
    homepage.value.removeEventListener('scroll', handleScroll);
    homepage.value.removeEventListener('scroll', handleScrollEnd);
  } else {
    dashboard.value.dashboardComp.removeEventListener(
      'touchstart',
      handleTouchStart
    );
    dashboard.value.dashboardComp.removeEventListener(
      'touchmove',
      handleTouchMove
    );
    dashboard.value.dashboardComp.removeEventListener(
      'touchend',
      handleTouchEnd
    );
  }
};

onMounted(() => {
  setSize();
  setScrollOrTouch();
  document.addEventListener('fullscreenchange', () => {
    globalStore.toggleFullscreen();
    setSize();
  });
  window.addEventListener('resize', () => {
    setSize();
  });
  widgetboxStore.initWidgetApps();
});

onUnmounted(() => {
  removeScrollOrTouch();
  document.removeEventListener('fullscreenchange', () => {
    globalStore.toggleFullscreen();
    setSize();
  });
  window.removeEventListener('resize', () => {
    setSize();
  });
});
</script>

<style lang="scss" scoped>
.homepage-wrapper {
  position: relative;
  width: 100%;
  height: var(--100vh);
  overflow-y: auto;
  overflow-x: hidden;
}

.homepage-wrapper::-webkit-scrollbar {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
