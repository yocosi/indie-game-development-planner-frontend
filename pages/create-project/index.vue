<script setup>
  definePageMeta({
    middleware: ["auth"],
  });

  const user = useSupabaseUser();
  const client = useSupabaseClient();

  const projectName = ref("");
  const projectDescription = ref("");
  const imagePath = ref("");
  const gddUrl = ref("");

  let errorMsg = ref("");
  let successMsg = ref("");


  async function createProject(){
    try{
      const {error} = await client.from("projects")
          .insert({
            title: projectName.value,
            description: projectDescription.value,
            image_path: imagePath.value,
            game_design_document_path: gddUrl.value,
            user_id: user.value.id
          });
      if(error) throw error;
      successMsg.value = "Project created!"
    } catch (error) {
      console.log(error);
      if(error.message === 'duplicate key value violates unique constraint "unique_title"'){
        errorMsg.value = `A project with the title '${projectName.value}' already exist.`
      } else {
        errorMsg.value = error.message;
      }
    }
  }

</script>

<template>
  <div class="flex justify-center items-center flex-col mt-20 mb-32">
    <h1 class="text-gray-400 font-medium text-2xl">Create a new project</h1>
    <form @submit.prevent="createProject" class="max-w-xl mx-auto border-2 border-gray-400 rounded-lg m-10 px-20 py-10 w-full">
      <div class="mb-5">
        <label for="project-name" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">Project name</label>
        <input v-model="projectName" type="text" id="project-name" class="bg-gray-900 border border-gray-400 text-gray-400 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      </div>
      <div class="mb-5">
        <label for="project-description" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">Project description</label>
        <input v-model="projectDescription" type="text" id="project-description" class="bg-gray-900 border border-gray-400 text-gray-400 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      </div>
      <div class="mb-5">
        <label for="gdd-url" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">Game design document url</label>
        <input v-model="gddUrl" type="text" id="gdd-url" class="bg-gray-900 border border-gray-400 text-gray-400 text-md rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      </div>
      <div class="mb-12">
        <label for="project-description" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">Upload a picture for your project</label>
        <input v-on:change="imagePath" type="file" id="project-description" class="bg-gray-900 border border-gray-400 text-gray-400 text-md rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5" required>
      </div>
      <div v-if="errorMsg && !successMsg" class="flex justify-center items-center font-medium text-red-600 mb-5">
        <p>{{errorMsg}}</p>
      </div>
      <div v-if="successMsg && !errorMsg" class="flex justify-center items-center font-medium text-green-600 mb-5">
        <p>{{successMsg}}</p>
      </div>
      <div class="flex justify-center items-center">
        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full
      sm:w-auto px-40 py-2.5 mr-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
      </div>
    </form>
  </div>
</template>