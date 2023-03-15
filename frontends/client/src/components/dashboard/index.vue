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
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGlobal } from '@/stores/global';
import IconArrowUp from '@/components/icons/IconArrowUp.vue';

const dashboardComp = ref(null);

const globalStore = useGlobal();
const { showDashboard, showDashboardMobile } = storeToRefs(globalStore);

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
