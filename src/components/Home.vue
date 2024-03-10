<script setup lang="ts">
import Countdown from './Countdown.vue'
</script>

<template>
  <div class="flex flex-col gap-y-10 place-items-center">
    <div
      class="sm:text-5xl text-4xl font-extrabold font-serif text-center lg:mt-5 mt-2"
    >
      <span class="text-accent opacity-85">✨🪩🥂Come </span>
      <span class="text-accent opacity-85 text-nowrap">celebrate!🎉❤️‍🔥🪱</span>
    </div>

    <Countdown></Countdown>

    <div class="flex flex-col gap-y-4 w-2/4">
      <router-link
        to="/submit"
        class="btn sm:btn-primary btn-secondary btn-sm place-self-center font-serif font-thin"
      >
        Give us your address! 😽
      </router-link>

      <a
        class="btn sm:btn-primary btn-secondary btn-sm place-self-center font-serif font-thin"
        href="https://www.amazon.com/wedding/share/megananddallinhuff"
      >
        See our registry! 😼
      </a>
    </div>
  </div>
</template>
