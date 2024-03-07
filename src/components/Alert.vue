<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    show?: boolean
    kind: 'success' | 'warning' | 'error'
    message: string
  }>()

  const color = computed(() => {
    switch (props.kind) {
      case 'success':
        return 'alert-success'
      case 'warning':
        return 'alert-warning'
      case 'error':
        return 'alert-error'
    }
  })

  const svgPath = computed(() => {
    switch (props.kind) {
      case 'success':
        return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      case 'warning':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
      case 'error':
        return 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'

    }
  })

</script>

<template>
  <div v-if="show ?? true" role="alert" :class="['alert', color]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        :d="svgPath"/>
    </svg>
    <span>{{message}}</span>
  </div>
</template>
