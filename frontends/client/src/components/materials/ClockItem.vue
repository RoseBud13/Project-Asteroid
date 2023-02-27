<!-- Inspired by https://github.com/eddyerburgh/vue-digital-clock
Modified by Rosebud on Feb 24 2023 -->
<template>
  <div id="clock" class="light">
    <time class="time">
      <span class="clock__hour">{{ state.hours }}</span>
      <span
        class="clock__colon"
        :style="{
          visibility: !blink || state.seconds % 2 === 0 ? 'visible' : 'hidden'
        }"
        >:</span
      >
      <span class="clock__minutes">{{ state.minutes }}</span>
      <span
        class="clock__colon"
        v-if="displaySeconds"
        :style="{
          visibility: !blink || state.seconds % 2 === 0 ? 'visible' : 'hidden'
        }"
        >:</span
      >
      <span v-if="displaySeconds" class="clock__seconds">{{
        state.seconds
      }}</span>
      <span v-if="twelveHour" class="clock__ampm">{{ state.amPm }}</span>
    </time>
    <!-- <div class="greetings">
          <p>{{ state.year }}-{{ state.month }}-{{ state.today }} {{ state.weekDay }}</p>
          <p>It's really nice to meet you here.</p>
      </div> -->
  </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue';

function padZero(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}
const getDate = () => new Date();
const getSeconds = () => padZero(getDate().getSeconds());
const getMinutes = () => padZero(getDate().getMinutes());
const getHour = twelveHour => {
  let hours = getDate().getHours();
  if (twelveHour && hours > 12) {
    hours = hours - 12;
  }
  return padZero(hours);
};
const getAmPm = () => (getDate().getHours() > 12 ? 'PM' : 'AM');
const week = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saterday'
];
const getYear = () => padZero(getDate().getFullYear());
const getMonth = () => padZero(getDate().getMonth() + 1);
const getDay = () => padZero(getDate().getDate());
const getWeek = () => week[getDate().getDay()];

const props = defineProps({
  blink: {
    type: Boolean,
    default: false
  },
  displaySeconds: {
    type: Boolean,
    default: false
  },
  twelveHour: {
    type: Boolean,
    default: false
  }
});

const state = reactive({
  ticker: null,
  minutes: getMinutes(),
  hours: getHour(props.twelveHour),
  seconds: getSeconds(),
  amPm: getAmPm(),
  year: getYear(),
  month: getMonth(),
  today: getDay(),
  weekDay: getWeek()
});

onMounted(() => {
  state.ticker = setInterval(() => {
    state.minutes = getMinutes();
    state.hours = getHour(props.twelveHour);
    state.seconds = getSeconds();
    state.today = getDay();
    state.weekDay = getWeek();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(state.ticker);
});
</script>

<style lang="scss">
#clock {
  text-align: center;
  margin: auto;
}
.time {
  transform: translate(-50%, -50%);
  font-size: 1.5em;
  letter-spacing: 0.2em;
}
.dark .time {
  color: #daf6ff;
  // text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}
.light .time {
  color: #23373d;
  // text-shadow: 0 0 20px #57656a, 0 0 20px rgba(10, 175, 230, 0);
}
.night .time {
  color: #daf6ff;
  // text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}
.sunset .time {
  color: #daf6ff;
  // text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}
.greetings {
  margin-top: 20px;
}
.greetings p {
  margin: 5px;
}
@media (max-width: 480px) {
  #clock {
    display: none;
  }
}
</style>
