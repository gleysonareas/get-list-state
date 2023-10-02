// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // "@nuxtjs/axios",
    '@nuxtjs/tailwindcss',
    '@invictus.codes/nuxt-vuetify',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
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
  // axios: {}
})
