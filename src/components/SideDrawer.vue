<script setup lang="ts">
defineProps<{tabOptions: {id: string; label: string}[]}>()
defineEmits<{optionClicked: [string]}>()
</script>

<template>
  <div class="drawer-side">
    <label
      for="toggle-nav-drawer"
      aria-label="close sidebar"
      class="drawer-overlay"
    ></label>
    <ul class="menu p-4 w-64 min-h-full bg-base-100 glassy text-accent">
      <li v-for="option in tabOptions" :key="option.id">
        <router-link :to="option.id" @click="$emit('optionClicked', option.id)">
          {{ option.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
