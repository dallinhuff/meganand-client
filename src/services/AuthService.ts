import { supabase } from '../lib/supabaseClient.ts'

export async function signUpNewUser(email: string, password: string): Promise<void> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      //emailRedirectTo: 'https://example.com/welcome',
    },
  })

  console.log({data, error});
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  console.log({data, error})
}