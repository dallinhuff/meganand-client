<template>
  <footer
    class="fixed bottom-0 footer p-2 text-accent flex flex-row justify-between"
  >
    <nav class="flex flex-row items-center">
      <a href="https://instagram.com/dallin.huff">
        <img src="/instagram.svg" alt="instagram logo" class="w-7" />
      </a>
      <a
        class="font-medium link-hover"
        href="mailto:pearl@loertscher.org?subject=Big Bugs on MeganAnd 🪲"
      >
        Report a bug
      </a>
    </nav>
    <nav class="flex flex-row items-center font-medium">
      <router-link class="link-hover mt-1.5" to="/login">
        Admin Login
      </router-link>
    </nav>
  </footer>
</template>
