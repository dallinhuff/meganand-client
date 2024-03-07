import { supabase } from '../lib/supabaseClient.ts'
import Address from '../models/Address.ts'

export class AddressService {
  /**
   * submit an address to the guest list
   * @param request the invitee's name and address
   */
  async create(request: Address): Promise<void> {
    const {error} = await supabase
      .from('address')
      .insert(request)

    if (error) {
      const {message} = error
      if (message.includes('duplicate key')) {
        throw new Error("Someone in your household has already requested an invitation. You're good to go!")
      }
      throw new Error(error.message)
    }
  }

  /**
   * read all submitted addresses
   * (requires authentication)
   * @return all submitted addresses
   */
  async read(): Promise<Address[]> {
    const {data, error, statusText} = await supabase
      .from('address')
      .select('*')

    if (error) {
      throw new Error(statusText)
    }

    return data
  }

  /**
   * delete an address by id
   * (requires authentication)
   * @param id the id of the address to delete
   * @return the number of addresses deleted (should be 1)
   */
  async delete(id: number): Promise<number> {
    const {count, error} = await supabase
      .from('address')
      .delete()
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return count ?? 0
  }
}

export default AddressService