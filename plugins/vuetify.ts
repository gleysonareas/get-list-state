import { defineNuxtPlugin } from "nuxt/app"
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import ptBR from 'date-fns/locale/pt-BR'
import DayJsAdapter from '@date-io/dayjs'
import DateFnsAdapter from '@date-io/date-fns'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VDatePicker,
    },
    date: {
      adapter: DateFnsAdapter && DayJsAdapter,
      locale: {
        pt: ptBR,
      },
    },
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
  app.vueApp.use(vuetify)
  app.vueApp.component('v-date-picker', VDatePicker)
})
