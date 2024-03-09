<script setup lang="ts">
import {onBeforeUnmount, ref} from 'vue'

const weddingDate = new Date(2024, 4, 16, 11, 0, 0)

const calculateTimeLeft = () => {
  const currentTime = new Date()
  const difference = weddingDate.getTime() - currentTime.getTime()
  const days = ~~(difference / (1000 * 60 * 60 * 24))
  const hours = ~~((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = ~~((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = ~~((difference % (1000 * 60)) / 1000)

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}

const timeLeft = ref(calculateTimeLeft())

const updateTimeLeft = () => {
  timeLeft.value = calculateTimeLeft()
}

const timer = setInterval(updateTimeLeft, 1000)

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div
    class="grid grid-flow-col gap-5 text-center text-secondary sm:text-primary font-serif auto-cols-max"
  >
    <div class="flex flex-col font-serif rounded-box glassy px-2 py-1">
      <span class="countdown font-sans font-light sm:text-6xl text-5xl">
        <span :style="`--value:${timeLeft.days};`"></span>
      </span>
      days
    </div>
    <div class="flex flex-col rounded-box glassy px-2 py-1">
      <span class="countdown font-sans font-light sm:text-6xl text-5xl">
        <span :style="`--value:${timeLeft.hours};`"></span>
      </span>
      hours
    </div>
    <div class="flex flex-col rounded-box glassy px-2 py-1">
      <span class="countdown font-sans font-light sm:text-6xl text-5xl">
        <span :style="`--value:${timeLeft.minutes};`"></span>
      </span>
      min
    </div>
    <div class="flex flex-col rounded-box glassy px-2 py-1">
      <span class="countdown font-sans font-light sm:text-6xl text-5xl">
        <span :style="`--value:${timeLeft.seconds};`"></span>
      </span>
      sec
    </div>
  </div>
</template>

<style scoped></style>
