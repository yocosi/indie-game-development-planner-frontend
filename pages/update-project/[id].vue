<script setup>
import {checkOwnership, getCurrentGame, handleImageUpload, update} from "~/services/api.js";

definePageMeta({
  middleware: ["auth"],
});

const user = useSupabaseUser();
const client = useSupabaseClient();
const route = useRoute();

const isOwner = ref(false);
let owner = ref("");

const projectName = ref("");
const projectDescription = ref("");
const gddUrl = ref("");

let errorMsg = ref("");
let successMsg = ref("");

let imagePath = null;
let imageUploadedMsg = ref("");
let imageErrorMsg = ref("");

async function updateProject(projectTitle){
  const updateData = {};
  if (projectName.value)
    updateData.title = projectName.value;
  if (projectDescription.value)
    updateData.description = projectDescription.value;
  if (imagePath)
    updateData.image_path = imagePath;
  if (gddUrl.value)
    updateData.game_design_document_path = gddUrl.value;

  const res = await update(updateData, projectTitle, client);
  if(res === 1){
    successMsg.value = "Project updated!";
  } else {
    errorMsg.value = "Error updating the project...";
  }
}

async function uploadImage(event) {
  imagePath = await handleImageUpload(event, client);
  if (imagePath) {
    imageUploadedMsg.value = "Image uploaded successfully!";
  } else {
    imageErrorMsg.value = 'Error uploading image. Please retry with another format or another name.';
  }
}


let currentProject = await getCurrentGame(route.params.id.replaceAll('-', ' '), client);

onMounted(async () => {
  if (user.value) {
    const res = await checkOwnership(route.params.id.replaceAll('-', ' '), client, user);
    owner.value = res[0];
    isOwner.value = res[1];
  }
});
</script>

<template>
  <div v-if="isOwner" class="flex justify-center items-center flex-col mt-20 mb-32">
    <h1 class="text-gray-400 font-medium text-2xl">Update the project</h1>
    <form @submit.prevent="updateProject(currentProject.title)" class="max-w-xl mx-auto border-2 border-gray-400 rounded-lg m-10 px-20 py-10 w-full">
      <div class="mb-5">
        <label for="project-name" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">New project name</label>
        <input v-model="projectName" type="text" id="project-name" class="bg-gray-900 border border-gray-400 text-gray-400 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 md:w-96 p-2.5">
      </div>
      <div class="mb-5">
        <label for="project-description" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">New project description</label>
        <input v-model="projectDescription" type="text" id="project-description" class="bg-gray-900 border border-gray-400 text-gray-400 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 md:w-96 p-2.5">
      </div>
      <div class="mb-5">
        <label for="gdd-url" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">New game design document url</label>
        <input v-model="gddUrl" type="text" id="gdd-url" class="bg-gray-900 border border-gray-400 text-gray-400 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 md:w-96 p-2.5">
      </div>
      <div v-if="!imageErrorMsg && !imageUploadedMsg" class="mb-12">
        <label for="project-image" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">New picture</label>
        <input @change="uploadImage" type="file" id="project-image" class="bg-gray-900 border border-gray-400 text-gray-400 text-md rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-80 md:w-96 p-2.5">
      </div>
      <div v-else class="mb-2">
        <label for="project-image" class="block mb-2 text-lg font-medium text-gray-400 dark:text-white">New picture</label>
        <input @change="uploadImage" type="file" id="project-image" class="bg-gray-900 border border-gray-400 text-gray-400 text-md rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-80 md:w-96 p-2.5">
      </div>
      <div v-if="imageErrorMsg && !imageUploadedMsg" class="flex justify-center items-center font-medium text-red-600 mb-12">
        <p>{{imageErrorMsg}}</p>
      </div>
      <div v-if="imageUploadedMsg && !imageErrorMsg" class="flex justify-center items-center font-medium text-green-600 mb-12">
        <p>{{imageUploadedMsg}}</p>
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
  <div v-else class="flex justify-center items-center flex-col mt-20 mb-32">
    <p class="font-medium">You are not the owner of the project, you can't modify it...</p>
  </div>
</template>