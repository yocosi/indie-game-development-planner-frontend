<script setup>
  import {deleteProject} from "~/services/api.js"

  definePageMeta({
    middleware: ["auth"],
  });

  const client = useSupabaseClient();
  const user = useSupabaseUser();

  const projectName = ref("");

  let errorMsg = ref("");
  let successMsg = ref("");

  async function remove(){
    const res = await deleteProject(projectName.value, client, user);
    switch (res){
      case 1:
        successMsg.value = "Project deleted!"
        break;
      case 0:
        errorMsg.value = `This project does not exist.`
        break;
      default:
        break;
    }
  }
</script>

<template>
  <div class="flex justify-center items-center flex-col mt-20 mb-32">
    <h1 class="text-gray-400 font-medium text-2xl">Delete a project</h1>
    <form @submit.prevent="remove" class="border-2 border-gray-400 rounded-lg m-10 px-10 md:px-20 py-10">
      <div class="mb-5">
        <label for="project-name" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">Name of the project to delete</label>
        <input v-model="projectName" type="text" id="project-name" class="bg-gray-900 border border-gray-400 text-gray-400 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 md:w-96 p-2.5" required>
      </div>
      <div v-if="errorMsg && !successMsg" class="flex justify-center items-center font-medium text-red-600 mb-5">
        <p>{{errorMsg}}</p>
      </div>
      <div v-if="successMsg && !errorMsg" class="flex justify-center items-center font-medium text-green-600 mb-5">
        <p>{{successMsg}}</p>
      </div>
      <div class="flex justify-center items-center">
        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full
      pl-30 pr-30 py-2.5 text-center">Delete</button>
      </div>
    </form>
  </div>
</template>