import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueTelegram from "vue-tg";

createApp(App).use(store).use(router).use(VueTelegram).mount("#app");
