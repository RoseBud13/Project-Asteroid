<template>
  <div class="dashboard-widget-container">
    <div class="widget-daily-update">
      <div class="widget-daily-update-quote">{{ dailyQuote.content }}</div>
      <div class="widget-daily-update-quote-info">{{ dailyQuote.info }}</div>
    </div>
    <h1>widget</h1>
    <div class="widget-test">
      <h1>test</h1>
      <br />
      <h1>test</h1>
      <br />
      <h1>test</h1>
      <br />
      <h1>hi</h1>
      <br />
      <h1>test</h1>
      <br />
      <h1>hi</h1>
      <br />
      <h1>test</h1>
      <br />
      <h1>hi</h1>
      <br />
      <h1>test</h1>
      <br />
      <h1>hi</h1>
      <br />
      <h1>test</h1>
      <br />
      <h1>hi</h1>
      <br />
      <h1>test</h1>
      <br />
    </div>
  </div>
</template>

<script setup>
import { useDashboardStore } from '@/stores/dashboard';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const dashboardStore = useDashboardStore();
const { dailyQuote } = storeToRefs(dashboardStore);

onMounted(() => {
  dashboardStore.initDashboardWidgets();
});
</script>

<style lang="scss" scoped>
.dashboard-widget-container {
  position: relative;
  width: 100%;
  padding: 0 10px;
}

.widget-daily-update {
  position: relative;
  width: 100%;
  margin: 20px 0;
}

.widget-daily-update-quote {
  font-size: 1.1rem;
}

.widget-daily-update-quote-info {
  margin-top: 15px;
  font-size: 0.9rem;
  text-align: right;
}

.widget-test {
  width: 200px;
  height: 2000px;
  background-color: white;
}
</style>
