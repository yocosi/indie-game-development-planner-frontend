<script setup>
const client = useSupabaseClient();
const router = useRouter();
const password = ref("");
const errorMsg = ref("");
const successMsg = ref("");

async function updatePassword(){
  try{
    const {error} = await client.auth.updateUser({ password: password.value })
    if(error) throw error;
    successMsg.value = "Password updated!";
    await router.push("/");
  } catch(error){
    console.error(error);
    errorMsg.value = error.message;
  }
}
</script>

<template>
  <div class="flex justify-center items-center flex-col mt-20 mb-32">
    <h1 class="text-gray-400 font-medium text-2xl">Update password</h1>
    <form @submit.prevent="updatePassword" class="max-w-xl mx-auto border-2 border-gray-400 rounded-lg m-10 px-20 py-10 w-full">
      <div class="mb-10">
        <label for="password" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">New password</label>
        <input v-model="password" type="text" id="password" class="bg-gray-900 border border-gray-300 text-gray-400 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 md:w-96 p-2.5" required>
      </div>
      <div v-if="errorMsg && !successMsg" class="flex justify-center items-center font-medium text-red-600 mb-5">
        <p>{{errorMsg}}</p>
      </div>
      <div v-if="successMsg && !errorMsg" class="flex justify-center items-center font-medium text-green-600 mb-5">
        <p>{{successMsg}}</p>
      </div>
      <div class="flex justify-center items-center">
        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full
      pl-30 pr-30 py-2.5 mr-7 text-center">Update</button>
      </div>
    </form>
  </div>
</template>