<script setup lang="ts">
import TextInput from './TextInput.vue'
import SelectInput from './SelectInput.vue'
import {States} from '../Constants.ts'
import {
  useInputRef,
  useValidationErrors,
  ValidationErrors,
} from '../composables/InputVar.ts'
import {AddressService} from '../services/AddressService.ts'
import {computed, ref} from 'vue'
import Alert from './Alert.vue'

type InputKey =
  | 'firstName'
  | 'lastName'
  | 'addrLine1'
  | 'addrLine2'
  | 'city'
  | 'state'
  | 'zipCode'

const validationError = useValidationErrors<InputKey>()

const firstName = useInputRef(validationError, 'firstName'),
  lastName = useInputRef(validationError, 'lastName'),
  addrLine1 = useInputRef(validationError, 'addrLine1'),
  addrLine2 = useInputRef(validationError, 'addrLine2'),
  city = useInputRef(validationError, 'city'),
  state = useInputRef(validationError, 'state'),
  zipCode = useInputRef(validationError, 'zipCode')

const repo = new AddressService()

const requestBody = computed(() => ({
  first_name: firstName.value,
  last_name: lastName.value,
  line1: addrLine1.value,
  line2: addrLine2.value || null,
  city: city.value,
  state: state.value.slice(0, 2),
  zip_code: zipCode.value,
}))

const messageKind = ref<'success' | 'warning' | 'error'>('warning')
const message = ref('')

async function update(): Promise<void> {
  message.value = ''

  const errors: ValidationErrors<InputKey> = {}

  if (!firstName.value.length) {
    errors.firstName = 'cannot be blank'
  }
  if (!lastName.value.length) {
    errors.lastName = 'cannot be blank'
  }
  if (!addrLine1.value.length) {
    errors.addrLine1 = 'cannot be blank'
  }
  if (!city.value.length) {
    errors.city = 'cannot be blank'
  }
  if (!state.value) {
    errors.state = 'must select one'
  }
  if (zipCode.value.length !== 5 || Number.isNaN(zipCode.value)) {
    errors.zipCode = 'must be 5-digit number'
  }

  validationError.value = Object.keys(errors).length === 0 ? undefined : errors

  if (validationError.value) {
    return
  }

  try {
    await repo.create(requestBody.value)
  } catch (e) {
    const err = e as Error
    messageKind.value = err.message.includes('good to go') ? 'warning' : 'error'
    message.value = err.message
    return
  }

  ;[firstName, lastName, addrLine1, addrLine2, city, state, zipCode].forEach(
    (r) => (r.value = ''),
  )
}
</script>

<template>
  <div class="min-w-72 w-full max-w-xl flex flex-col gap-y-2">
    <Alert :kind="messageKind" :show="!!message" :message="message" />
    <form
      @submit.prevent="update"
      class="grid grid-cols-2 gap-2 border-2 p-4 pb-6 rounded-2xl shadow-xl"
    >
      <TextInput
        required
        v-model="firstName"
        label="First Name"
        class="col-span-2 sm:col-span-1"
        :validationError="validationError?.firstName"
      />
      <TextInput
        required
        v-model="lastName"
        label="Last Name"
        class="col-span-2 sm:col-span-1"
        :validationError="validationError?.lastName"
      />
      <TextInput
        required
        v-model="addrLine1"
        label="Address Line 1"
        class="col-span-2"
        :validationError="validationError?.addrLine1"
      />
      <TextInput
        v-model="addrLine2"
        label="Address Line 2"
        class="col-span-2"
      />
      <TextInput
        required
        v-model="city"
        label="City"
        class="col-span-2"
        :validationError="validationError?.city"
      />
      <SelectInput
        required
        v-model="state"
        :options="States"
        label="State"
        :validationError="validationError?.state"
      />
      <TextInput
        required
        v-model="zipCode"
        label="Zip Code"
        :validationError="validationError?.zipCode"
      />
      <input
        type="submit"
        value="Submit"
        class="btn btn-primary col-span-2 mt-3"
        :disabled="!!validationError"
      />
    </form>
  </div>
</template>
