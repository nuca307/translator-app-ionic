import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import { IonicVue } from '@ionic/vue'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Theme variables */
import './theme/variables.css'
import './theme/core.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import mitt from 'mitt'

import { SpeechRecognition } from '@capacitor-community/speech-recognition'

const emitter = mitt()

const app = createApp(App).use(IonicVue).use(router).use(store)

app.config.globalProperties.emitter = emitter
if (Capacitor.getPlatform() !== 'web') {
  // Plugin'i kullan
  app.config.globalProperties.$speechRecognition = SpeechRecognition
}

router.isReady().then(() => {
  app.mount('#app')
})
