<template>
  <main class="container h-screen mx-auto flex justify-center items-center">
    <div class="justify-center items-center">
      <img :src="usePWAIcon(192)">
      <span class="text-lg">This page should work offline.</span>
    </div>
  </main>
</template>

<style lang="postcss">
html {
  @apply bg-cool-gray-900 text-white
}
</style>
