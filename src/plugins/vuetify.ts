// import { defineNuxtPlugin } from "nuxt/app"
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'


// export default defineNuxtPlugin((app) => {
// const vuetify = createVuetify({
export default createVuetify({
  // ... your configuration
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})
// app.vueApp.use(vuetify)
// })
