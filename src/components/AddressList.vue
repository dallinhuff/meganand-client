<script setup lang="ts">
import {ref} from 'vue'
import AddressService from '../services/AddressService.ts'
import Address, {prettyPrintAddress} from '../models/Address.ts'
import CsvService from '../services/CsvService.ts'

const service = new AddressService()
const addresses = ref<Address[]>([])
loadAddresses()

async function loadAddresses(): Promise<void> {
  addresses.value = await service.read()
}

function exportAddresses(format: 'csv' | 'plain') {
  const filename = `Megan & Dallin Addresses — ${new Date().toLocaleDateString()}`
  switch (format) {
    case 'plain':
      CsvService.downloadBlob(
        filename,
        addresses.value.map(prettyPrintAddress).join('\n\n'),
        format
      )
      break
    case 'csv':
      CsvService.exportToCsv(
      filename,
      addresses.value,
      [
        'first_name',
        'last_name',
        'line1',
        'line2',
        'city',
        'state',
        'zip_code'
      ]
    )
  }
  //

}
</script>

<template>
  <div class="overflow-x-auto">
    <div class="flex justify-end gap-x-2 pb-4">
      <button class="btn" @click="exportAddresses('csv')">Download CSV</button>
      <button class="btn" @click="exportAddresses('plain')">Download Text</button>
    </div>
    <table class="table table-zebra">
      <thead>
        <tr>
          <th></th>
          <th>First</th>
          <th>Last</th>
          <th>Street Address</th>
          <th>Line 2</th>
          <th>City</th>
          <th>State</th>
          <th>Zip Code</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(address, index) in addresses">
          <th>{{ index + 1 }}</th>
          <td>{{ address.first_name }}</td>
          <td>{{ address.last_name }}</td>
          <td>{{ address.line1 }}</td>
          <td>{{ address.line2 }}</td>
          <td>{{ address.city }}</td>
          <td>{{ address.state }}</td>
          <td>{{ address.zip_code }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
