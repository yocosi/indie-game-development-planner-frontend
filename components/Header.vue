<script setup>
  const user = useSupabaseUser();
  const client = useSupabaseClient();

  console.log(user)

  async function logout(){
    try{
      const {error} = await client.auth.signOut();
      if (error) throw error;
    } catch (error){
      console.log(error.message);
    }
  }
</script>

<template>
  <div class="bg-gray-900 rounded h-20 px-2 py-1 text-white mb-2
  flex justify-between items-center">
    <div class="header-logo-container flex justify-center items-center font-medium">
      <NuxtLink to="/">
        LOGO
      </NuxtLink>
    </div>
    <div v-if="!user" class="header-menu-container flex justify-center items-center font-medium text-xl ml-96">
      <NuxtLink to="/">
        <p class="m-4 hover:underline underline-offset-8 hover:cursor-pointer hover:opacity-70">Dashboard</p>
      </NuxtLink>
      <NuxtLink to="/projects">
        <p class="m-4 hover:underline underline-offset-8 hover:cursor-pointer hover:opacity-70">Projects</p>
      </NuxtLink>
      <NuxtLink to="/tasks">
        <p class="m-4 hover:underline underline-offset-8 hover:cursor-pointer hover:opacity-70">Tasks</p>
      </NuxtLink>
    </div>
    <div v-else class="header-menu-container flex justify-center items-center font-medium text-xl ml-72">
      <NuxtLink to="/">
        <p class="m-4 hover:underline underline-offset-8 hover:cursor-pointer hover:opacity-70">Dashboard</p>
      </NuxtLink>
      <NuxtLink to="/projects">
        <p class="m-4 hover:underline underline-offset-8 hover:cursor-pointer hover:opacity-70">Projects</p>
      </NuxtLink>
      <NuxtLink to="/tasks">
        <p class="m-4 hover:underline underline-offset-8 hover:cursor-pointer hover:opacity-70">Tasks</p>
      </NuxtLink>
    </div>
    <div class="header-form-container flex justify-center items-center">
      <form class="mx-3 h-12">
        <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="search" id="search" class="block w-full p-2.5 ps-10 text-md font-medium text-gray-400 border border-gray-300 rounded-lg bg-gray-900
        focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required>
        </div>
      </form>
      <NuxtLink v-if="!user" to="/login">
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-3 overflow-hidden text-sm font-medium text-blue-500 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500
    group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Login
          </span>
        </button>
      </NuxtLink>

      <NuxtLink v-if="!user" to="/signup">
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-3 overflow-hidden text-sm font-medium text-blue-500 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500
    group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Sign-up
          </span>
        </button>
      </NuxtLink>

      <NuxtLink to="/login">
        <button v-if="user" @click="logout" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-3 overflow-hidden text-sm font-medium text-blue-500 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500
  group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Logout
        </span>
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss"></style>