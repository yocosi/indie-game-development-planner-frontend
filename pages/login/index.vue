<template>
  <div class="flex justify-center items-center flex-col mt-20">
    <h1 class="text-gray-400 font-medium text-2xl">Connect to the Indie game development planner</h1>
    <p class="text-gray-400 font-medium">You don't have any account yet ? <NuxtLink to="/signup" class="text-blue-500 hover:opacity-70">Sign-up.</NuxtLink></p>
    <form class="max-w-xl mx-auto border-2 border-gray-400 rounded-lg m-10 px-20 py-10 w-full">
      <div class="mb-10">
        <label for="email" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">E-mail</label>
        <input type="email" id="email" class="bg-gray-900 border border-gray-400 text-gray-400 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      </div>
      <div class="mb-10">
        <label for="password" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">Password</label>
        <input type="password" id="password" class="bg-gray-900 border border-gray-300 text-gray-400 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      </div>
      <div class="flex items-start mb-5">
        <div class="flex items-center h-6">
          <input id="remember" type="checkbox" value="" class="w-3 h-3 border border-gray-400 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300
          dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required checked>
        </div>
        <div class="flex flex-row items-center">
          <label for="remember" class="ms-2 font-medium text-gray-400 dark:text-gray-300 pr-32">Remember me</label>
          <NuxtLink to="/resetting" class="text-blue-500 font-medium hover:opacity-70">Forgot password?</NuxtLink>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full
      sm:w-auto px-44 py-2.5 mr-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
</script>