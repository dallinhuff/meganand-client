<script setup lang="ts">
import TextInput from './TextInput.vue'
import { useInputRef, useValidationErrors, ValidationErrors } from '../composables/InputVar.ts'
import { signInWithEmail } from '../services/AuthService.ts'
import PasswordInput from './PasswordInput.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const validationError = useValidationErrors<'email' | 'password'>()

const email    = useInputRef(validationError, 'email'),
      password = useInputRef(validationError, 'password')

const submit = async () => {
  const errors: ValidationErrors<'email' | 'password'> = {}
  const e = email.value ?? ''
  const p = password.value ?? ''

  if (!e.length)
    errors.email = 'cannot be blank'
  if (!p.length)
    errors.password = 'cannot be blank'

  if (Object.keys(errors).length > 0) {
    validationError.value = errors
    return
  }

  try {
    await signInWithEmail(e, p)
  } catch (error) {
    errors.email = errors.password = (error as Error).message
    validationError.value = errors
    return
  }

  email.value = ''
  password.value = ''

  await router.push('/addresses')
}

</script>

<template>
  <form
    @submit.prevent="submit"
    class="flex flex-col gap-2 min-w-72 w-full max-w-xl p-4 pb-6 border-2 rounded-2xl shadow-xl">
    <TextInput
      required
      v-model="email"
      label="Email"
      :validationError="validationError?.email"/>
    <PasswordInput
      required
      v-model="password"
      label="Password"
      :validationError="validationError?.password"/>
    <input
      type="submit"
      value="Login"
      class="btn btn-primary mt-3"/>
  </form>
</template>
