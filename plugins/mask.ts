import { defineNuxtPlugin } from "nuxt/app";
import VueTheMask, { mask } from 'vue-the-mask'
import VueMask, { VueMaskDirective, VueMaskFilter } from 'v-mask'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTheMask);
  nuxtApp.vueApp.directive(mask);
});