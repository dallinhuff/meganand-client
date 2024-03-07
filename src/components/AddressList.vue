<script setup lang="ts">
import {ref} from 'vue'
import AddressService from '../services/AddressService.ts'
import Address from '../models/Address.ts'

const service = new AddressService()
const addresses = ref<Address[]>([])
loadAddresses()

async function loadAddresses(): Promise<void> {
  addresses.value = await service.read()
}
</script>

<template>
  <div class="overflow-x-auto">
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
