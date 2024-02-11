<script setup>
  const client = useSupabaseClient();
  const router = useRouter();
  const email = ref("");
  const password = ref(null);
  const errorMsg = ref(null);

  async function signIn(){
    try {
      const {error} = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });
      if(error) throw error;
      await router.push("/");
    }catch (error){
      errorMsg.value = error.message;
    }
  }
</script>

<template>
  <div class="flex justify-center items-center flex-col mt-20">
    <h1 class="text-gray-400 font-medium text-xl md:text-2xl">Connect to the Indie game development planner</h1>
    <p class="text-gray-400 font-medium">You don't have any account yet ? <NuxtLink to="/signup" class="text-blue-500 hover:opacity-70">Sign-up.</NuxtLink></p>
    <form @submit.prevent="signIn" class="max-w-xl mx-auto border-2 border-gray-400 rounded-lg m-10 px-20 py-10 w-full">
      <div class="mb-10">
        <label for="email" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">E-mail</label>
        <input v-model="email" type="email" id="email" class="bg-gray-900 border border-gray-400 text-gray-400 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 md:w-96 p-2.5" required>
      </div>
      <div class="mb-10">
        <label for="password" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">Password</label>
        <input v-model="password" type="password" id="password" class="bg-gray-900 border border-gray-300 text-gray-400 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 md:w-96 p-2.5" required>
      </div>
      <div v-if="errorMsg" class="flex justify-center items-center font-medium text-red-600 mb-5">
        <p>{{errorMsg}}</p>
      </div>
      <div class="flex items-start mb-5">
        <div class="flex flex-row items-center">
          <NuxtLink to="/resetting" class="text-blue-500 font-medium hover:opacity-70">Forgot password?</NuxtLink>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full
      pl-30 pr-30 py-2.5 mr-7 text-center">Login</button>
      </div>
    </form>
  </div>
</template>