import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import { createPinia } from 'pinia'
import Toast, { POSITION, PluginOptions } from 'vue-toastification'

import './main.css'

const app = createApp(App)

const toastOptions: PluginOptions = {
  container: () => {
    const container = document.querySelector('#tabletop-notification-container') as HTMLElement
    if (!container) throw new Error('#tabletop-notification-container could not be found')

    return container
  },
  position: POSITION.TOP_RIGHT,
  timeout: 5000,

  icon: false,
  closeButton: false,
  closeOnClick: false,
  pauseOnHover: false,
}

app.use(createPinia())
app.use(router)
app.use(Toast, toastOptions)

app.mount('#tabletop-online')
