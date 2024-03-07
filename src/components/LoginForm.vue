<script setup lang="ts">
import TextInput from './TextInput.vue'
import {
  useInputRef,
  useValidationErrors,
  ValidationErrors,
} from '../composables/InputVar.ts'
import {signInWithEmail} from '../services/AuthService.ts'
import PasswordInput from './PasswordInput.vue'
import {useRouter} from 'vue-router'
import Alert from './Alert.vue'
import {ref} from 'vue'

const router = useRouter()

const validationError = useValidationErrors<'email' | 'password'>()

const email = useInputRef(validationError, 'email'),
  password = useInputRef(validationError, 'password')

const upstreamError = ref(false)

const submit = async () => {
  upstreamError.value = false
  const errors: ValidationErrors<'email' | 'password'> = {}
  const e = email.value ?? ''
  const p = password.value ?? ''

  if (!e.length) {
    errors.email = 'cannot be blank'
  }
  if (!p.length) {
    errors.password = 'cannot be blank'
  }

  if (Object.keys(errors).length > 0) {
    validationError.value = errors
    return
  }

  try {
    await signInWithEmail(e, p)
  } catch (error) {
    upstreamError.value = true
    return
  }

  email.value = ''
  password.value = ''

  await router.push('/addresses')
}
</script>

<template>
  <div class="flex flex-col gap-y-2 min-w-72 w-full max-w-xl">
    <Alert
      :show="upstreamError"
      kind="error"
      message="Your username or password is incorrect. Try again."
    />
    <form
      @submit.prevent="submit"
      class="flex flex-col gap-2 p-4 pb-6 border-2 rounded-2xl shadow-xl"
    >
      <TextInput
        required
        v-model="email"
        label="Email"
        :validationError="validationError?.email"
      />
      <PasswordInput
        required
        v-model="password"
        label="Password"
        :validationError="validationError?.password"
      />
      <input type="submit" value="Login" class="btn btn-primary mt-3" />
    </form>
  </div>
</template>
