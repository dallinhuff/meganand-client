import {supabase} from '../lib/supabaseClient.ts'

export async function signUpNewUser(
  email: string,
  password: string,
): Promise<void> {
  await supabase.auth.signUp({
    email,
    password,
    options: {
      //emailRedirectTo: 'https://example.com/welcome',
    },
  })
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<void> {
  const {error} = await supabase.auth.signInWithPassword({email, password})

  if (error) throw new Error(error.message)
}
