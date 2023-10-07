import { defineNuxtPlugin } from "nuxt/app";
import PrimeVue from "primevue/config";
import Chart from 'primevue/chart';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { unstyled: true });
  nuxtApp.vueApp.component("Chart", Chart);
});