<script setup lang="ts">
import {computed, ref} from 'vue'
import AddressService from '../services/AddressService.ts'
import Address, {prettyPrintAddress, SavedAddress} from '../models/Address.ts'
import ExportService from '../services/ExportService.ts'

const service = new AddressService()
const addresses = ref<SavedAddress[]>([])
const hasNew = computed(() => addresses.value.some((a) => !a.exported))
loadAddresses()

const filename = `Megan & Dallin Addresses — ${new Date().toLocaleDateString()}`
const headerKeys: (keyof Address)[] = [
  'first_name',
  'last_name',
  'line1',
  'line2',
  'city',
  'state',
  'zip_code',
]

async function loadAddresses(): Promise<void> {
  addresses.value = await service.read()
}

async function exportAddresses(
  selection: 'all' | 'new',
  format: 'csv' | 'plain',
) {
  let toExport: SavedAddress[]
  switch (`${selection}_${format}`) {
    case 'all_plain':
      toExport = addresses.value
      ExportService.exportToTxt(filename, toExport, prettyPrintAddress)
      break
    case 'all_csv':
      toExport = addresses.value
      ExportService.exportToCsv(filename, toExport, headerKeys)
      break
    case 'new_plain':
      toExport = addresses.value.filter((a) => !a.exported)
      ExportService.exportToTxt(filename, toExport, prettyPrintAddress)
      break
    case 'new_csv':
      toExport = addresses.value.filter((a) => !a.exported)
      ExportService.exportToCsv(filename, toExport, headerKeys)
      break
    default:
      return
  }
  try {
    await service.markAsExported(toExport.map((a) => a.id))
    await loadAddresses()
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="overflow-x-auto">
    <div class="flex justify-between pb-4">
      <button
        class="btn btn-secondary sm:btn-primary"
        @click="exportAddresses('all', 'csv')"
      >
        Download CSV (all)
      </button>
      <button
        class="btn btn-secondary sm:btn-primary"
        @click="exportAddresses('all', 'plain')"
      >
        Download Text (all)
      </button>
      <button
        class="btn btn-secondary sm:btn-primary"
        @click="exportAddresses('new', 'csv')"
        :disabled="!hasNew"
      >
        Download CSV (new)
      </button>
      <button
        class="btn btn-secondary sm:btn-primary"
        @click="exportAddresses('new', 'plain')"
        :disabled="!hasNew"
      >
        Download Text (new)
      </button>
    </div>
    <table class="table bg-accent bg-opacity-50 backdrop-blur mt rounded-xl">
      <thead class="text-sm text-accent-content">
        <tr class="border-accent-content">
          <th></th>
          <th>First</th>
          <th>Last</th>
          <th>Street Address</th>
          <th>Line 2</th>
          <th>City</th>
          <th>State</th>
          <th>Zip Code</th>
          <th>Exported</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(address, index) in addresses" class="border-accent-content">
          <th>
            {{ index + 1 }}
          </th>
          <td>{{ address.first_name }}</td>
          <td>{{ address.last_name }}</td>
          <td>{{ address.line1 }}</td>
          <td>{{ address.line2 }}</td>
          <td>{{ address.city }}</td>
          <td class="text-center">{{ address.state }}</td>
          <td class="text-center">{{ address.zip_code }}</td>
          <th class="text-center">
            {{ address.exported ? '✓' : '' }}
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
