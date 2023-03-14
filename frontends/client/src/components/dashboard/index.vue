<template>
  <div
    ref="dashboard"
    class="dashboard-container"
    :class="{ 'dashboard-show': showDashboard }"
  >
    <div class="dashboard-hint">
      <div class="arrow-wrapper">
        <IconArrowUp></IconArrowUp>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useGlobe } from '@/stores/globe';
import IconArrowUp from '../icons/IconArrowUp.vue';

const globeStore = useGlobe();
const { showDashboard } = storeToRefs(globeStore);
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
  top: 90vh;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
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
