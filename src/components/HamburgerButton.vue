<script setup lang="ts">
const props = defineProps<{for: string}>()
</script>

<template>
  <label
    :for="props.for"
    aria-label="open sidebar"
    class="btn btn-square btn-ghost"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="inline-block w-6 h-6 stroke-accent"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      ></path>
    </svg>
  </label>
</template>
