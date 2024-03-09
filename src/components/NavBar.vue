<script setup lang="ts">
import HamburgerButton from './HamburgerButton.vue'
import {useRoute} from 'vue-router'

defineProps<{
  title: string
  tabOptions: {id: string; label: string}[]
}>()

const route = useRoute()
</script>

<template>
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
</template>
