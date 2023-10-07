import { defineNuxtPlugin } from "nuxt/app";
import VueTheMask, { mask } from 'vue-the-mask'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTheMask);
  nuxtApp.vueApp.directive(mask);
});