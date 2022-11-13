import '@/assets/scss/main.scss';
import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import router from '@/router';
import pinia from '@/store';

import App from '@/App.vue';
import VClickOutside from '@/helpers/directives/v-click-outside';

import i18n from "@/mocks/i18n";

const app = createApp(App);

app.directive('click-outside', VClickOutside);

app.use(router);
app.use(pinia);

app.mount('#app');
