import { defineNuxtConfig } from "nuxt/config";
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@invictus.codes/nuxt-vuetify',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  buildModules: [
    "@nuxtjs/axios"
  ],
  plugins: [
    { src: '/plugins/vuetify.ts' },
    { src: '/plugins/vuelidate.ts' },
    { src: '/plugins/mask.ts' },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
} as any)
