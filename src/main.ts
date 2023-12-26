import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueTelegram from "vue-tg";
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/lara-light-green/theme.css'

createApp(App).use(store).use(router).use(VueTelegram).use(PrimeVue).use(ToastService).mount("#app");
