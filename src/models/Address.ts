export type Address = {
  first_name: string
  last_name: string
  line1: string
  line2: string | null
  city: string
  state: string
  zip_code: string
}

export function prettyPrintAddress(address: Address): string {
  const fullName = `${address.first_name} ${address.last_name}`
  const streetAddr = address.line2
    ? `${address.line1},\n${address.line2}`
    : address.line1
  const cityStateZip = `${address.city}, ${address.state} ${address.zip_code}`
  return [fullName, streetAddr, cityStateZip].join('\n')
}

export default Address
