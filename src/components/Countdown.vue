<script setup lang="ts">
import {onBeforeUnmount, Ref, ref} from 'vue'

const weddingDate = new Date(2024, 4, 16, 11, 0, 0)

const [MS_PER_SEC, SEC_PER_MIN, MIN_PER_HR, HR_PER_DAY] = [1000, 60, 60, 24]
const MS_PER_MIN = MS_PER_SEC * SEC_PER_MIN
const MS_PER_HR = MS_PER_MIN * MIN_PER_HR
const MS_PER_DAY = MS_PER_HR * HR_PER_DAY

type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds'
type TimeLeft = {[k in TimeUnit]: number}
function calculateTimeLeft(): TimeLeft {
  const currentTime = new Date()
  const difference = weddingDate.getTime() - currentTime.getTime()

  return {
    days: ~~(difference / MS_PER_DAY),
    hours: ~~((difference % MS_PER_DAY) / MS_PER_HR),
    minutes: ~~((difference % MS_PER_HR) / MS_PER_MIN),
    seconds: ~~((difference % MS_PER_MIN) / MS_PER_SEC),
  }
}

const timeLeft: Ref<TimeLeft> = ref(calculateTimeLeft())

const updateTimeLeft = () => (timeLeft.value = calculateTimeLeft())

const timer = setInterval(updateTimeLeft, 1000)

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div
    class="grid grid-flow-col gap-5 text-center sm:text-primary-content text-secondary-content font-serif auto-cols-max"
  >
    <div
      v-for="label in ['days', 'hours', 'minutes', 'seconds'] as TimeUnit[]"
      class="flex flex-col font-serif rounded-box glassy px-2 py-1"
    >
      <span class="countdown font-sans font-light text-5xl">
        <span :style="`--value:${timeLeft[label]};`"></span>
      </span>
      {{ label }}
    </div>
  </div>
</template>

<style scoped></style>
