import {computed, ref, Ref} from 'vue'

export type ValidationErrors<K extends string> = {[k in K]?: string}
export type ValidationRef<K extends string> = Ref<
  ValidationErrors<K> | undefined
>

/**
 * Create a reactive ref for holding form validation errors
 */
export function useValidationErrors<K extends string>(): ValidationRef<K> {
  return ref()
}

/**
 * Create a reactive ref for holding a validated form input
 * @param validationErrors the validation errors object for the whole form
 * @param key the key in validationErrors associated with this value
 * @param initialVal the initial value to store in the ref
 */
export function useInputRef<K extends string>(
  validationErrors: Ref<{[k in K]?: string} | undefined>,
  key: K,
  initialVal?: string,
) {
  const r = ref<string>(initialVal ?? '')

  return computed({
    get: () => r.value,
    set(v: string): void {
      if (validationErrors.value) {
        delete validationErrors.value[key]
      }

      if (
        !validationErrors.value ||
        !Object.keys(validationErrors.value).length
      ) {
        validationErrors.value = undefined
      }

      r.value = v
    },
  })
}
