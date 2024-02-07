<script setup>
  const user = useSupabaseUser();
  const client = useSupabaseClient();

  async function getUserProjects(userId){
    try{
      const { data, error } = await client
          .from("projects")
          .select()
          .eq("user_id", userId)
      if(error) throw error;
      return data || [];
    } catch (error){
      console.error(error);
      return [];
    }
  }

  async function getAllProjects(userId){
    try{
      if(userId === undefined){
        const {data, error} = await client
            .from("projects")
            .select()
        if(error) throw error;
        return data || [];
      } else {
        const {data, error} = await client
            .from("projects")
            .select()
            .neq("user_id", userId)
        if(error) throw error;
        return data || [];
      }
    } catch(error){
      console.error(error);
      return [];
    }
  }

  function getProjectImage(imagePath){
      const storage = client.storage;
      const {data} = storage.from("images")
          .getPublicUrl(imagePath);
      return data.publicUrl;
  }

  let userProjects = await getUserProjects(user.value?.id);
  let otherProjects = await getAllProjects(user.value?.id);

  const isUserProjectsEmpty = userProjects.length === 0;
  const isOtherProjectsEmpty = otherProjects.length === 0;
</script>

<template>
  <div class="flex justify-center items-center flex-col mt-20">
    <h1 v-if="!user" class="text-gray-400 font-medium text-2xl">My recent projects</h1>
    <div v-else>
      <h1 class="text-gray-400 font-medium text-2xl">{{user.user_metadata.username}}'s recent projects</h1>
      <p v-for="project in userProjects" class="mt-2">
        {{project.title}}
        <img
            class=""
            :src="getProjectImage(project.image_path)"
            alt="" />
      </p>
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
    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <div v-for="project in otherProjects" class="border-2 border-gray-500 p-20 hover:cursor-pointer hover:bg-gray-700 flex items-center justify-center">
        {{project.title}}
      </div>
    </div>
    <p v-if="isOtherProjectsEmpty && user" class="text-gray-400 font-medium flex flex-col justify-center items-center">
      <span>No projects.</span>
     Do you want to be the first one to create a project ?<br> <NuxtLink to="/create-project" class="text-blue-500 hover:opacity-70">Click here</NuxtLink>
    </p>
  </div>
</template>

<style lang="scss"></style>