import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import AddressForm from './components/AddressForm.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: AddressForm },
  { path: '/login', component: AddressForm }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

createApp(App)
  .use(router)
  .mount('#app')
