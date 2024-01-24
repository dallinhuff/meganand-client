<script setup lang="ts">
import TextInput from './TextInput.vue'
import SelectInput from './SelectInput.vue'
import { Countries, States } from '../Constants.ts'
import { useInputVar, useValidationError, ValidationError } from './InputVar.ts'

const validationError = useValidationError()

const firstName = useInputVar(validationError)('firstName'),
      lastName  = useInputVar(validationError)('lastName'),
      addrLine1 = useInputVar(validationError)('addrLine1'),
      addrLine2 = useInputVar(validationError)('addrLine2'),
      city      = useInputVar(validationError)('city'),
      state     = useInputVar(validationError)('state'),
      zipCode   = useInputVar(validationError)('zipCode'),
      country   = useInputVar(validationError)('country', Countries[0])

async function update(): Promise<void> {
  const errors: ValidationError = {}

  if (!firstName.value?.length)
    errors.firstName = 'cannot be blank'
  if (!lastName.value?.length)
    errors.lastName = 'cannot be blank'
  if (!addrLine1.value?.length)
    errors.addrLine1 = 'cannot be blank'
  if (!city.value?.length)
    errors.city = 'cannot be blank'
  if (!state.value)
    errors.state = 'must select one'
  if (zipCode.value?.length !== 5 || Number.isNaN(zipCode.value))
    errors.zipCode = 'must be 5-digit number'
  if (!country.value)
    errors.country = 'must select one'

  validationError.value = Object.keys(errors).length === 0
    ? undefined
    : errors

  if (validationError.value) {
    return;
  }

  try {
    // TODO: replace with real save
    const result = await Promise.resolve("Success")
  } catch (e) {
    // TODO: handle upstream errors
    return;
  }

  ;[firstName, lastName, addrLine1, addrLine2, city, state, zipCode].forEach(r => r.value = "")
  country.value = Countries[0]
}
</script>

<template>
  <form
    @submit.prevent="update"
    class="grid grid-cols-2 gap-2 min-w-72 w-full max-w-xl p-4 pb-6 border-2 rounded-2xl">
    <TextInput
      required
      v-model="firstName"
      label="First Name"
      :validationError="validationError?.firstName"/>
    <TextInput
      required
      v-model="lastName"
      label="Last Name"
      :validationError="validationError?.lastName"/>
    <TextInput
      required
      v-model="addrLine1"
      label="Address Line 1"
      class="col-span-2"
      :validationError="validationError?.addrLine1"/>
    <TextInput
      v-model="addrLine2"
      label="Address Line 2"
      class="col-span-2"/>
    <TextInput
      required
      v-model="city"
      label="City"
      class="col-span-2"
      :validationError="validationError?.city"/>
    <SelectInput
      required
      v-model="state"
      :options="States"
      label="State"
      :validationError="validationError?.state"/>
    <TextInput
      required
      v-model="zipCode"
      label="Zip Code"
      :validationError="validationError?.zipCode"/>
    <SelectInput
      required
      v-model="country"
      :options="Countries"
      label="Country"
      :validationError="validationError?.country"/>
    <input
      type="submit"
      value="Submit"
      class="btn btn-primary col-span-2 mt-3"
      :disabled="!!validationError"/>
  </form>
</template>
