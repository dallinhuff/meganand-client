<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import AddressForm from './components/AddressForm.vue'
import { ref } from 'vue'

const currentTab = ref<string>(),
      tabOptions = [
        {id: 'home', label: 'Home'},
        {id: 'login', label: 'Login'}
      ]
</script>

<template>
  <NavBar v-model="currentTab" title="M & D" :options="tabOptions">
    <main class="flex w-full justify-center">
      <AddressForm/>
    </main>
  </NavBar>
</template>
