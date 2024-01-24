import { computed, ref, Ref } from 'vue'

export type ValidationKey =
  'firstName' |
  'lastName' |
  'addrLine1' |
  'addrLine2' |
  'city' |
  'state' |
  'zipCode' |
  'country'

export type ValidationError = {
  firstName?: string
  lastName?: string
  addrLine1?: string
  addrLine2?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
}

export const  useValidationError = () => ref<ValidationError | undefined>()

export const useInputVar = (validationError: Ref<ValidationError | undefined>) =>
  (key: ValidationKey, val?: string) => {
    const r = ref<string | undefined>(val)
    return computed({
      get: () => r.value,
      set: (v: string | undefined) => {
        if (validationError.value) {
          delete validationError.value[key]
        }

        if (
          !validationError.value ||
          !Object.keys(validationError.value).length
        ) {
          validationError.value = undefined
        }

        r.value = v
      }
    })
}