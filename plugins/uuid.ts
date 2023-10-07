import { defineNuxtPlugin } from "nuxt/app";
import UUID from "vue-uuid";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(UUID);
});
