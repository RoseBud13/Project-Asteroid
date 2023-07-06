<template>
  <div class="homepage-wrapper" ref="homepage">
    <HomeBackground></HomeBackground>
    <HomeNavbar></HomeNavbar>
    <HomeDashboard ref="dashboard"></HomeDashboard>
    <HomeModal></HomeModal>
    <AstraNotes v-if="showNotes"></AstraNotes>
  </div>
</template>

<script setup>
import HomeBackground from './components/HomeBackground.vue';
import HomeNavbar from './components/HomeNavbar.vue';
import HomeDashboard from '@/components/dashboard/index.vue';
import HomeModal from './components/HomeModal.vue';
import { useGlobal } from '@/stores/global';
import { useAppNotesStore } from '@/stores/appNotes';
import { storeToRefs } from 'pinia';
import {
  ref,
  onMounted,
  onBeforeUnmount,
  defineAsyncComponent,
  inject
} from 'vue';
import { useAutoLayout } from '@/utils/elements';

const pinStickies = inject('stickies');

const AstraNotes = defineAsyncComponent(() =>
  import('@/components/applications/notes/index.vue')
);

const homepage = ref(null);
const dashboard = ref(null);

const globalStore = useGlobal();
const { deviceType, showDashboardMobile } = storeToRefs(globalStore);

const appNotesStore = useAppNotesStore();
const { showNotes, stickyList } = storeToRefs(appNotesStore);

const scrollTop = ref(0);
const scrollStart = ref(0);
const target = ref(); // distence of toggling dashbaord
const scrollTimeoutTime = ref(800); // 0.8s is the minimum scroll interval to act as debounce
const touchStartY = ref(0); // 触摸位置
const touchEndY = ref(0); // 结束位置

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

const fullscreenChange = () => {
  const fullEl =
    document.fullcreenElement ||
    document.mozFullScreenElement ||
    document.webkitCurrentFullScreenElement;
  if (!fullEl) {
    globalStore.setFullscreenState(false);
  }
};

const renderStickies = () => {
  if (stickyList.value.length > 0) {
    appNotesStore.initNotes();
    const stickyListTemp = stickyList.value;
    stickyList.value.forEach(item => {
      appNotesStore.unpinNote(item.stickyID);
    });

    let target = {
      x: 260,
      y: 200,
      amount: stickyListTemp.length
    };
    const positionInfo = useAutoLayout(target);

    stickyListTemp.forEach((item, index) => {
      appNotesStore.pinNote(item.stickyID);
      const sticky = pinStickies(
        item.stickyID,
        item.content,
        positionInfo[index]
      );
      sticky.instance;
      appNotesStore.updateStickyList(
        item.stickyID,
        item.content,
        sticky.unmount
      );
    });
  }
};

onMounted(() => {
  setSize();
  setScrollOrTouch();
  document.addEventListener('fullscreenchange', () => {
    fullscreenChange();
  });
  document.addEventListener('webkitfullscreenchange', () => {
    fullscreenChange();
  });
  window.addEventListener('resize', () => {
    if (homepage.value) {
      setSize();
    }
  });
  appNotesStore.initStickies();
  renderStickies();
});

onBeforeUnmount(() => {
  removeScrollOrTouch();
  document.removeEventListener('fullscreenchange', () => {
    fullscreenChange();
  });
  document.removeEventListener('webkitfullscreenchange', () => {
    fullscreenChange();
  });
  window.removeEventListener('resize', () => {
    if (homepage.value) {
      setSize();
    }
  });
});
</script>

<script>
export default {
  name: 'AstraHome'
};
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
</style>
