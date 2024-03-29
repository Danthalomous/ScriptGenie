// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import LoginComponent from './components/LoginModal.vue'
import store from "./stores/index"
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Import Material Design Icons CSS
import '@mdi/font/css/materialdesignicons.min.css';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    // Customize the theme here
    themes: {
      light: {
        primary: '#DADDDA', 
        secondary: '#646464', 
        accent: '#00D9FF', 
        text: '#000000'
      },
    },
  }
})

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(store)
app.use(router)

app.component('LoginComponent', LoginComponent) // Register the LoginComponent

app.mount('#app')
