<template>
  <div
    ref="dashboardComp"
    class="dashboard-container"
    :class="{
      'dashboard-show': showDashboard,
      'dashboard-show-mobile': showDashboardMobile
    }"
  >
    <div class="dashboard-hint">
      <div class="arrow-wrapper">
        <IconArrowUp></IconArrowUp>
      </div>
    </div>
    <div class="dashboard-content-wrapper" ref="dashboardContent">
      <div class="dashboard-content">
        <div
          class="dashboard-content-widget"
          :style="{
            transform: `translate3d(-${dashboardViewIndex * 100}%, 0, 0)`
          }"
        >
          <h1>widget</h1>
        </div>
        <div
          class="dashboard-content-main"
          :style="{
            transform: `translate3d(-${dashboardViewIndex * 100}%, 0, 0)`
          }"
        >
          <h1>main</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useGlobal } from '@/stores/global';
import IconArrowUp from '@/components/icons/IconArrowUp.vue';

const dashboardComp = ref(null);
const dashboardContent = ref(null);

const globalStore = useGlobal();
const { showDashboard, showDashboardMobile, dashboardViewIndex, deviceType } =
  storeToRefs(globalStore);

const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = event => {
  touchStartX.value = event.targetTouches[0].clientX;
  touchEndX.value = 0;
};

const handleTouchMove = event => {
  touchEndX.value = event.targetTouches[0].clientX;
};

const handleTouchEnd = () => {
  if (!touchEndX.value || Math.abs(touchEndX.value - touchStartX.value) < 20) {
    return;
  }
  if (touchEndX.value < touchStartX.value) {
    globalStore.nextDashboardView();
  } else {
    globalStore.prevDashboardView();
  }
};

const changeDashboardView = () => {
  if (deviceType.value === 'PC' || deviceType.value === '') {
    dashboardContent.value.style.overflowX = 'auto';
  } else {
    dashboardContent.value.addEventListener('touchstart', handleTouchStart);
    dashboardContent.value.addEventListener('touchmove', handleTouchMove);
    dashboardContent.value.addEventListener('touchend', handleTouchEnd);
  }
};

onMounted(() => {
  changeDashboardView();
});

onUnmounted(() => {
  dashboardContent.value.addEventListener('touchstart', handleTouchStart);
  dashboardContent.value.addEventListener('touchmove', handleTouchMove);
  dashboardContent.value.addEventListener('touchend', handleTouchEnd);
});

defineExpose({
  dashboardComp
});
</script>

<script>
export default {
  name: 'HomeDashboard'
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
  height: 100vh;
  z-index: 1;
  position: relative;
  top: var(--90vh);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
}

.dashboard-container::-webkit-scrollbar {
  display: none;
}

.dashboard-show {
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  padding-top: 50px;
}

.dashboard-show-mobile {
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  padding-top: 50px;
  top: 0;
}

.dashboard-hint {
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
}

.dashboard-show .dashboard-hint {
  display: none;
}

.dashboard-show-mobile .dashboard-hint {
  display: none;
}

.arrow-wrapper {
  opacity: 0;
  animation: 16s bounce;
}

.dashboard-content-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.dashboard-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.dashboard-content * {
  border: 1px red solid;
}

.dashboard-content-widget {
  flex: 3;
  display: flex;
  flex-direction: column;
  min-width: 320px;
  position: relative;
}

.dashboard-content-main {
  flex: 7;
  display: flex;
  flex-direction: column;
  position: relative;
}

@media (max-width: 960px) {
  .dashboard-content-widget {
    min-width: 330px;
  }
}

@media (max-width: 660px) {
  .dashboard-content {
    width: 200%;
    transition: all 0.5s ease;
  }
  .dashboard-content-widget {
    flex: 1;
    min-width: auto;
    transition: transform 0.5s ease;
  }

  .dashboard-content-main {
    flex: 1;
    transition: transform 0.5s ease;
  }
}

@keyframes bounce {
  0%,
  13%,
  15%,
  17%,
  43%,
  45%,
  47%,
  73%,
  75%,
  77% {
    transform: translateY(0);
    opacity: 1;
  }
  14%,
  44%,
  74% {
    transform: translateY(-25px);
    opacity: 1;
  }
  16%,
  46%,
  76% {
    transform: translateY(-15px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
