<script setup>
  import {getAllProjects, getProjectImage, getUserProjects} from "~/services/api.js";

  const user = useSupabaseUser();
  const client = useSupabaseClient();

  let userProjects = await getUserProjects(user.value?.id, client);
  let otherProjects = await getAllProjects(user.value?.id, client);

  userProjects.reverse();
  otherProjects.reverse();

  userProjects = userProjects.slice(0,8);
  otherProjects = otherProjects.slice(0,8);

  const isUserProjectsEmpty = userProjects.length === 0;
  const isOtherProjectsEmpty = otherProjects.length === 0;
</script>

<template>
  <div class="flex justify-center items-center flex-col mt-20">
    <h1 class="text-gray-400 font-medium text-2xl">My recent projects</h1>
    <div v-if="user">
      <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 3xl:grid-cols-4 gap-4">
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
    </div>
    <p v-if="isUserProjectsEmpty && user" class="text-gray-400 font-medium mt-2">
      You don't have any projects.<br>
      You can create a project <NuxtLink to="/create-project" class="text-blue-500 hover:opacity-70">here</NuxtLink>
    </p>
    <p v-if="!user" class="text-gray-400 font-medium mt-2">
      <NuxtLink to="/login" class="text-blue-500 hover:opacity-70">Login</NuxtLink>
      or <NuxtLink to="/signup" class="text-blue-500 hover:opacity-70">sign-up</NuxtLink>
      to see and create projects.
    </p>
  </div>
  <div v-if="user" class="border-2 w-full border-gray-500 mt-20 mb-20"></div>
  <div v-if="user" class="flex justify-center items-center flex-col mt-20 mb-32">
    <h1 class="text-gray-400 font-medium text-2xl mb-5">Recent public projects</h1>
    <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 3xl:grid-cols-4 gap-4">
      <div v-for="project in otherProjects" class="mt-4 flex flex-col justify-center items-center">
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
    <p v-if="isOtherProjectsEmpty && user" class="text-gray-400 font-medium flex flex-col justify-center items-center">
      <span>No public projects from other creators.</span>
    </p>
  </div>
</template>

<style lang="scss"></style>