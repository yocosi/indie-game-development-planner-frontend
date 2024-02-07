<script setup>
  const client = useSupabaseClient();
  const username = ref("");
  const email = ref("");
  const password = ref(null);
  const errorMsg = ref("");
  const successMsg = ref("");

  async function signUp(){
    try {
      const {error} = await client.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            username: username.value,
            email: email.value,
          },
        },
      });
      if(error) throw error;
      successMsg.value = "Check your email to confirm your account.";
    }catch (error){
      console.error(error);
      errorMsg.value = error.message;
    }
  }
</script>

<template>
  <div class="flex justify-center items-center flex-col mt-20 mb-32">
    <h1 class="text-gray-400 font-medium text-2xl">Sign-up to the Indie game development planner</h1>
    <p class="text-gray-400 font-medium">You already have an account ? <NuxtLink to="/login" class="text-blue-500 hover:opacity-70">Login.</NuxtLink></p>
    <form @submit.prevent="signUp" class="max-w-xl mx-auto border-2 border-gray-400 rounded-lg m-10 px-20 py-10 w-full">
      <div class="mb-5">
        <label for="username" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">Username</label>
        <input v-model="username" type="text" id="username" class="bg-gray-900 border border-gray-400 text-gray-400 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <p class="text-gray-400 font-medium text-sm pt-1 w-96">Your username can only contain letters, numbers, underscores or hyphens.</p>
      </div>
      <div class="mb-5">
        <label for="email" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">E-mail</label>
        <input v-model="email" type="email" id="email" class="bg-gray-900 border border-gray-400 text-gray-400 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      </div>
      <div class="mb-12">
        <label for="password" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">Password</label>
        <input v-model="password" type="password" id="password" class="bg-gray-900 border border-gray-400 text-gray-400 text-md rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      </div>
      <div v-if="errorMsg && !successMsg" class="flex justify-center items-center font-medium text-red-600 mb-5">
        <p>{{errorMsg}}</p>
      </div>
      <div v-if="successMsg && !errorMsg" class="flex justify-center items-center font-medium text-green-600 mb-5">
        <p>{{successMsg}}</p>
      </div>
      <div class="flex justify-center items-center">
        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full
      sm:w-auto px-40 py-2.5 mr-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign-up</button>
      </div>
    </form>
  </div>
</template>
