<script setup lang="ts">
import HamburgerButton from './components/HamburgerButton.vue'
import {ref} from 'vue'
import {useRoute} from 'vue-router'

const title = 'Megan & Dallin'

const tabOptions = [
  {id: '/home', label: 'Home'},
  {id: '/submit', label: 'Submit Address'},
  {id: '/login', label: 'Login'},
]

const expanded = ref(false)
const route = useRoute()
</script>

<template>
  <div class="drawer h-screen sm:bg-dancing md:bg-groundrats bg-sitting sm:bg-center md:bg-top bg-left-bottom bg-fixed bg-cover">
    <input
      id="toggle-nav-drawer"
      type="checkbox"
      v-model="expanded"
      class="drawer-toggle"
    />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="w-full navbar">
        <div class="flex-none sm:hidden">
          <HamburgerButton for="toggle-nav-drawer" />
        </div>
        <router-link to="/" class="flex-1 px-2 mx-2 text-xl font-serif italic">
          {{ title }}
        </router-link>
        <div class="flex-none hidden sm:block">
          <ul class="menu menu-horizontal">
            <li v-for="option in tabOptions" :key="option.id">
              <router-link
                :to="option.id"
                :class="[
                  'font-medium',
                  {'underline underline-offset-4': route.path === option.id},
                ]"
              >
                {{ option.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- main content -->
      <main class="flex w-full justify-center p-4">
        <router-view />
      </main>
    </div>
    <div class="drawer-side">
      <label
        for="toggle-nav-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-100">
        <li v-for="option in tabOptions" :key="option.id">
          <router-link :to="option.id" @click="expanded = false">{{
            option.label
          }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
