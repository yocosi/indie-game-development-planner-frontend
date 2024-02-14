<script setup>
import {getProjectImage, getUserProjects} from "~/services/api.js";

  definePageMeta({
    middleware: ["auth"],
  });
  const user = useSupabaseUser();
  const client = useSupabaseClient();

  let userProjects = await getUserProjects(user.value?.id, client);
</script>

<template>
  <div class="flex justify-center items-center flex-col mt-20 mb-32">
    <h1 class="text-gray-400 font-medium text-2xl">All my projects</h1>
    <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 3xl:grid-cols-4 gap-4 mb-12">
      <div v-for="project in userProjects">
        <NuxtLink class="mt-4 flex flex-col justify-center items-center"
                  :to="'/projects/'+project.title.replaceAll(' ', '-')">
          <p class="font-medium text-xl hover:underline hover:underline-offset-4 mb-1">{{project.title}}</p>
          <div class="h-64 w-96">
            <img
                class="object-cover w-full h-full rounded-xl hover:opacity-70"
                :src="getProjectImage(project.image_path, client)"
                alt=""
            />
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="mt-5">
      <NuxtLink to="/create-project">
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-3 overflow-hidden text-sm font-medium text-blue-500 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500
  group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Create a project
        </span>
        </button>
      </NuxtLink>
      <NuxtLink to="/delete-project">
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-3 overflow-hidden text-sm font-medium text-blue-500 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500
  group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Delete a project
        </span>
        </button>
      </NuxtLink>
    </div>
  </div>
</template>