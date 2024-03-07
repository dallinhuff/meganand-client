import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import AddressForm from './components/AddressForm.vue'
import LoginForm from './components/LoginForm.vue'
import AddressList from './components/AddressList.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: AddressForm },
  { path: '/login', component: LoginForm },
  { path: '/addresses', component: AddressList }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

createApp(App)
  .use(router)
  .mount('#app')
