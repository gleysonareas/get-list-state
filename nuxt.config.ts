import { defineNuxtConfig } from "nuxt/config"
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // "@nuxtjs/axios",
    '@nuxtjs/tailwindcss',
    '@invictus.codes/nuxt-vuetify',
    // '@nuxtjs/dayjs',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  plugins: [
    { src: '/plugins/vuetify.ts' },
    // { src: '/plugins/axios.ts' }
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
} as any)
