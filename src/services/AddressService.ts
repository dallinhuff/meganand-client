import { supabase } from '../lib/supabaseClient.ts'

type Address = {
  first_name: string
  last_name: string
  line1: string
  line2: string | null
  city: string
  state: string
  zip_code: string
}

export class AddressService {
  async create(request: Address): Promise<void> {
    const result = await supabase
      .from('address')
      .insert(request)

    if (result.status !== 201) {
      throw new Error(result.statusText);
    }
  }

  async delete(id: number): Promise<void> {
    const {status, statusText, count} = await supabase
      .from('address')
      .delete()
      .eq('id', id)
      .single();

    if (status >= 400 || (count ?? 0) < 1) {
      throw new Error(statusText);
    }
  }
}