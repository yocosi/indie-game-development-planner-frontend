<script setup>
import {checkOwnership, deleteProject, getCurrentGame, getProjectImage} from "~/services/api.js";

definePageMeta({
  middleware: ["auth"],
});

const user = useSupabaseUser();
const client = useSupabaseClient();
const route = useRoute();

const isOwner = ref(false);
let owner = ref("");

let projectDeletedMsg = ref("");

async function remove(projectTitle){
  const res = await deleteProject(projectTitle, client, user);
  if(res === 1)
    projectDeletedMsg.value = "Project deleted, click on the button below to go to your dashboard.";
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
  <div class="mt-5 mb-32 flex flex-col items-center justify-center">
    <div class="mt-4 flex flex-col justify-center items-center">
      <p class="font-light italic">(Owner: {{ owner }})</p>
      <p class="font-medium text-xl underline underline-offset-4 mb-5">{{ currentProject.title }}</p>
      <div class="h-64 w-96 mb-5">
        <img
            class="object-cover w-full h-full rounded-xl"
            :src="getProjectImage(currentProject.image_path, client)"
            alt=""
        />
      </div>
      <div>
        <p class="text-description font-medium text-xl italic mb-5 max-w-72 md:max-w-3xl">{{ currentProject.description }}</p>
      </div>
      <a v-if="currentProject.game_design_document_path && isOwner" :href="currentProject.game_design_document_path" class="mb-5 font-medium">
        Game design document: <span class="font-normal hover:underline underline-offset-4">{{currentProject.game_design_document_path}}</span>
      </a>
    </div>
    <div>
      <NuxtLink :to="'/update-project/'+currentProject.title.replaceAll(' ', '-')">
        <button v-if="isOwner && !projectDeletedMsg" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-3 overflow-hidden text-sm font-medium text-blue-500 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500
group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span
              class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Update this project
          </span>
        </button>
      </NuxtLink>
      <button v-if="isOwner && !projectDeletedMsg" @click="remove(currentProject.title)" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-3 overflow-hidden text-sm font-medium text-blue-500 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500
group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
        <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Delete this project
        </span>
      </button>
    </div>
    <div v-if="projectDeletedMsg" class="flex justify-center items-center font-medium text-green-600 mb-5">
      <p>{{projectDeletedMsg}}</p>
    </div>
    <NuxtLink to="/">
      <button v-if="isOwner && projectDeletedMsg" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-3 overflow-hidden text-sm font-medium text-blue-500 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500
group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
      <span
          class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Go back to dashboard
      </span>
      </button>
    </NuxtLink>
  </div>
</template>

<style>
.text-description{
  width: 80rem;
  text-align: center;
}

@media only screen and (max-width: 1290px){
  .text-description{
    width: 60rem;
  }
}

@media only screen and (max-width: 950px){
  .text-description{
    width: 40rem;
  }
}

@media only screen and (max-width: 650px){
  .text-description{
    width: 30rem;
  }
}
</style>