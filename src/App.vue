<script setup lang="ts">
import HamburgerButton from './components/HamburgerButton.vue'
import {ref} from 'vue'
import {useRoute} from 'vue-router'

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
    class="drawer h-screen sm:bg-dancing bg-sitting sm:bg-top bg-fixed bg-cover"
  >
    <input
      id="toggle-nav-drawer"
      type="checkbox"
      v-model="expanded"
      class="drawer-toggle"
    />
    <div class="drawer-content h-screen overflow-y-auto">
      <!-- Navbar -->
      <div class="w-full navbar">
        <div class="flex-none sm:hidden">
          <HamburgerButton for="toggle-nav-drawer" />
        </div>
        <router-link
          to="/"
          class="flex-1 px-2 mx-2 text-xl font-serif italic text-accent"
        >
          {{ title }}
        </router-link>
        <div class="flex-none hidden sm:block">
          <ul class="flex flex-row textarea-sm gap-x-4">
            <li v-for="option in tabOptions" :key="option.id">
              <router-link
                :to="option.id"
                :class="[
                  'font-sans font-medium text-accent',
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
      <footer
        v-if="route.path === tabOptions[0].id"
        class="fixed bottom-0 footer p-2 text-accent flex flex-row justify-between"
      >
        <nav class="flex flex-row items-center">
          <a href="https://instagram.com/dallin.huff">
            <img src="/instagram.svg" alt="instagram logo" class="w-7" />
          </a>
          <a
            class="font-medium link-hover"
            href="mailto:pearl@loertscher.org?subject=Big Bugs on MeganAnd 🪲"
          >
            Report a bug
          </a>
        </nav>
        <nav class="flex flex-row items-center font-medium">
          <router-link class="link-hover mt-1.5" to="/login">
            Admin Login
          </router-link>
        </nav>
      </footer>
    </div>
    <div class="drawer-side">
      <label
        for="toggle-nav-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu p-4 w-64 min-h-full bg-base-100 glassy text-accent">
        <li v-for="option in tabOptions" :key="option.id">
          <router-link :to="option.id" @click="expanded = false">{{
            option.label
          }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
