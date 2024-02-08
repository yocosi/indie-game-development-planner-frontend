<script setup>
definePageMeta({
  middleware: ["auth"],
});

const user = useSupabaseUser();
const client = useSupabaseClient();
const route = useRoute();

const isOwner = ref(false);
let owner = ref("");

let projectDeletedMsg = ref("");

async function getCurrentGame(projectTitle){
  try{
    const {data, error} = await client.from("projects")
        .select()
        .eq("title", projectTitle);
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error(error.message);
  }
}

function getProjectImage(imagePath) {
  const storage = client.storage;
  const {data} = storage.from("images")
      .getPublicUrl(imagePath);
  return data.publicUrl;
}

async function deleteProject(projectTitle) {
  try {
    const {error} = await client.from("projects")
        .delete()
        .eq('user_id', user.value.id)
        .eq('title', projectTitle)
    if (error) throw error;
    console.log("Project deleted!");
    projectDeletedMsg.value = "Project deleted, click on the button below to go to your dashboard."
  } catch (error) {
    console.error(error.message);
  }
}

async function getProjectOwner(userId){
  try{
    const {data, error} = await client.from("profiles")
        .select('username')
        .eq('id', userId)
        .single()
    if (error) throw error;
    return data.username;
  } catch (error) {
    console.error(error.message);
  }
}

async function checkOwnership(projectTitle) {
  try {
    const {data, error} = await client.from("projects")
        .select('user_id')
        .eq('title', projectTitle)
        .single()
    if (error) throw error;
    owner.value = await getProjectOwner(data.user_id);
    if (data && data.user_id === user.value.id) {
      isOwner.value = true;
    }
  } catch (error) {
    console.error(error.message);
  }
}

let currentProject = await getCurrentGame(route.params.id.replace('-', ' '));

onMounted(() => {
  if (user.value) {
    checkOwnership(route.params.id.replace('-', ' '));
  }
});
</script>

<template>
  <div class="mt-5 flex flex-col items-center justify-center">
    <div class="mt-4 flex flex-col justify-center items-center">
      <p class="font-light italic">(Owner: {{ owner }})</p>
      <p class="font-medium text-xl underline underline-offset-4 mb-5">{{ currentProject.title }}</p>
      <div class="h-64 w-96 mb-5">
        <img
            class="object-cover w-full h-full"
            :src="getProjectImage(currentProject.image_path)"
            alt=""
        />
      </div>
      <p class="font-medium text-xl italic mb-5" style="width: 80rem; text-align: center;">{{ currentProject.description }}</p>
      <a v-if="currentProject.game_design_document_path && isOwner" :href="currentProject.game_design_document_path" class="mb-5 font-medium">
        Game design document: <span class="font-normal hover:underline underline-offset-4">{{currentProject.game_design_document_path}}</span>
      </a>
    </div>
    <div>
      <NuxtLink :to="'/update-project/'+currentProject.title.replace(' ', '-')" target="_blank">
        <button v-if="isOwner && !projectDeletedMsg" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-3 overflow-hidden text-sm font-medium text-blue-500 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500
group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span
              class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Update this project
          </span>
        </button>
      </NuxtLink>
      <button v-if="isOwner && !projectDeletedMsg" @click="deleteProject(currentProject.title)" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-3 overflow-hidden text-sm font-medium text-blue-500 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500
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