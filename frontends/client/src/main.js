import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import i18n from './locale';
import toast from './components/basics/toast/toastPlugin';

import './assets/style/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(toast);

app.mount('#app');
