<script setup lang="ts">
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import SideDrawer from './components/SideDrawer.vue'

const title = 'Megan & Dallin'

const tabOptions = [
  {id: '/home', label: 'Home'},
  {id: '/submit', label: 'Submit Address'},
]

const expanded = ref(false)
const route = useRoute()
</script>

<template>
  <div
    class="drawer h-screen sm:bg-dancing bg-window sm:bg-top bg-center bg-fixed bg-cover"
  >
    <input
      id="toggle-nav-drawer"
      type="checkbox"
      v-model="expanded"
      class="drawer-toggle"
    />
    <div class="drawer-content h-screen overflow-y-auto">
      <NavBar :title="title" :tab-options="tabOptions" />
      <main class="flex w-full justify-center p-4">
        <router-view />
      </main>
      <Footer v-if="route.path === tabOptions[0].id" />
    </div>
    <SideDrawer :tab-options="tabOptions" @optionClicked="expanded = false" />
  </div>
</template>
