<script setup lang="ts">
defineProps<{
  label: string
  placeholder?: string
  options: readonly string[]
  required?: boolean
  validationError?: string
}>()

const modelValue = defineModel<string | undefined>()
</script>

<template>
  <label class="form-control">
    <div class="label">
      <span class="label-text">
        {{ label }}
        <span v-if="required" class="text-red-600 font-bold">*</span>
      </span>
    </div>
    <select
      v-model="modelValue"
      :class="['select select-bordered', {'select-error': !!validationError}]"
    >
      <option disabled :selected="!modelValue">
        {{ placeholder ?? '--' }}
      </option>
      <option v-for="option in options" :selected="modelValue === option">
        {{ option }}
      </option>
    </select>
  </label>
</template>
