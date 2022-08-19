import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import VueCookies from 'vue3-cookies';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueToast);
app.use(VueCookies);
app.mount("#app");


