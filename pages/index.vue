<script setup>
</script>

<template>
  <div class="flex justify-center items-center flex-col mt-20">
    <h1 class="text-gray-400 font-medium text-2xl">My projects</h1>
    <p class="text-gray-400 font-medium mt-2">
      <NuxtLink to="/login" class="text-blue-500 hover:opacity-70">Login</NuxtLink>
      or <NuxtLink to="/signup" class="text-blue-500 hover:opacity-70">sign-up</NuxtLink>
      to see and create projects.
    </p>
  </div>
  <div class="border-2 w-full border-gray-500 mt-20 mb-20"></div>
  <div class="flex justify-center items-center flex-col mt-20 mb-32">
    <h1 class="text-gray-400 font-medium text-2xl mb-5">Recent public projects</h1>
    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <div class="border-2 border-gray-500 p-40 hover:cursor-pointer hover:bg-gray-700">
        01
      </div>
      <div class="border-2 border-gray-500 p-40 hover:cursor-pointer hover:bg-gray-700">
        02
      </div>
      <div class="border-2 border-gray-500 p-40 hover:cursor-pointer hover:bg-gray-700">
        03
      </div>
      <div class="border-2 border-gray-500 p-40 hover:cursor-pointer hover:bg-gray-700">
        04
      </div>
      <div class="border-2 border-gray-500 p-40 hover:cursor-pointer hover:bg-gray-700">
        05
      </div>
      <div class="border-2 border-gray-500 p-40 hover:cursor-pointer hover:bg-gray-700">
        06
      </div>
      <div class="border-2 border-gray-500 p-40 hover:cursor-pointer hover:bg-gray-700">
        07
      </div>
      <div class="border-2 border-gray-500 p-40 hover:cursor-pointer hover:bg-gray-700">
        08
      </div>
      <div class="border-2 border-gray-500 p-40 hover:cursor-pointer hover:bg-gray-700">
        09
      </div>
      <div class="border-2 border-gray-500 p-40 hover:cursor-pointer hover:bg-gray-700">
        10
      </div>
      <div class="border-2 border-gray-500 p-40 hover:cursor-pointer hover:bg-gray-700">
        11
      </div>
      <div class="border-2 border-gray-500 p-40 hover:cursor-pointer hover:bg-gray-700">
        12
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>