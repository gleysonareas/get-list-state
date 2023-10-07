import { defineNuxtConfig } from "nuxt/config";
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@invictus.codes/nuxt-vuetify',
    [
      '@vee-validate/nuxt',
      {
        autoImports: true,
        componentNames: {
          Form: 'VeeForm',
          Field: 'VeeField',
          FieldArray: 'VeeFieldArray',
          ErrorMessage: 'VeeErrorMessage',
        },
      },
    ],
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
    { src: '/plugins/veeValidate.ts' },
    { src: '/plugins/vueTheMask.ts' },
    { src: '/plugins/uuid.ts' },
    { src: '/plugins/primevue.ts' },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css"
  ]
} as any)
