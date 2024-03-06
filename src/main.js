// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import LoginComponent from './components/LoginModal.vue'
import store from "../src/stores/index"
import router from './router'
import 'vuetify/styles'

const app = createApp(App)

app.use(createPinia())
app.use(store)
app.use(router)

app.component('LoginComponent', LoginComponent) // Register the LoginComponent

app.mount('#app')