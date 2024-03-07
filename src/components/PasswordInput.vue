<script setup lang="ts">
defineProps<{
  label: string
  placeholder?: string
  required?: boolean
  validationError?: string
}>()

const modelValue = defineModel<string>({required: true})
</script>

<template>
  <label :class="['form-control']">
    <div class="label">
      <span class="label-text">
        {{ label }}
        <span v-if="required" class="text-red-600 font-bold">*</span>
      </span>
      <span v-if="validationError" class="label-text text-error">{{
        validationError
      }}</span>
    </div>
    <input
      type="password"
      :placeholder="placeholder"
      :class="['input input-bordered', {'input-error': !!validationError}]"
      v-model="modelValue"
    />
  </label>
</template>
