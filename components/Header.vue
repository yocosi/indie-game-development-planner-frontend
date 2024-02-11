<script setup>
  const user = useSupabaseUser();
  const client = useSupabaseClient();

  async function logout(){
    try{
      await client.auth.signOut();
    } catch (error){
      console.error(error.message);
    }
  }
</script>

<template>
  <div class="bg-gray-900 rounded h-100 lg:h-20 px-2 py-1 text-white mb-2
  flex justify-between items-center flex-col lg:flex-row">
    <div class="header-logo-container flex justify-center items-center font-medium">
      <NuxtLink to="/">
        <img src="~/public/favicon.ico" alt="">
      </NuxtLink>
    </div>
    <div v-if="!user" class="header-menu-container flex justify-center items-center font-medium text-xl mb-3 mt-3 lg:ml-36">
      <NuxtLink to="/">
        <p class="m-3 hover:underline underline-offset-8 hover:cursor-pointer hover:opacity-70">Dashboard</p>
      </NuxtLink>
      <NuxtLink to="/create-project">
        <p class="m-3 hover:underline underline-offset-8 hover:cursor-pointer hover:opacity-70">Create</p>
      </NuxtLink>
      <NuxtLink to="/projects">
        <p class="m-3 hover:underline underline-offset-8 hover:cursor-pointer hover:opacity-70">Projects</p>
      </NuxtLink>
    </div>
    <div v-else class="header-menu-container flex justify-center items-center font-medium text-xl mb-3 mt-3 lg:ml-10">
      <NuxtLink to="/">
        <p class="m-3 hover:underline underline-offset-8 hover:cursor-pointer hover:opacity-70">Dashboard</p>
      </NuxtLink>
      <NuxtLink to="/create-project">
        <p class="m-3 hover:underline underline-offset-8 hover:cursor-pointer hover:opacity-70">Create</p>
      </NuxtLink>
      <NuxtLink to="/projects">
        <p class="m-3 hover:underline underline-offset-8 hover:cursor-pointer hover:opacity-70">Projects</p>
      </NuxtLink>
    </div>
    <div class="header-form-container flex justify-center items-center ml-3">
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

<style lang="scss">
</style>