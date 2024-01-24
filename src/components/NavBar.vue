<script setup lang="ts">
type NavOption = {id: string, label: string, href: string}
defineProps<{
  title: string
  options: NavOption[]
}>()

defineModel<string>()
</script>

<template>
  <div class="drawer">
    <input id="toggle-nav-drawer" type="checkbox" class="drawer-toggle"/>
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="w-full navbar bg-base-300">
        <div class="flex-none sm:hidden">
          <label for="toggle-nav-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>
        <div class="flex-1 px-2 mx-2">{{ title }}</div>
        <div class="flex-none hidden sm:block">
          <ul class="menu menu-horizontal">
            <li v-for="option in options" :key="option.id"><a @click="$emit('update:modelValue', option.id)">{{option.label}}</a></li>
          </ul>
        </div>
      </div>
      <slot class="p-4"></slot>
    </div>
    <div class="drawer-side">
      <label for="toggle-nav-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200">
        <li v-for="option in options" :key="option.id"><a @click="$emit('update:modelValue', option.id)">{{option.label}}</a></li>
      </ul>
    </div>
  </div>
</template>