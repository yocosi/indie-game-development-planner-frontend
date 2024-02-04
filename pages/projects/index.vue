<script setup>
  definePageMeta({
    middleware: ["auth"],
  });
  const user = useSupabaseUser();
</script>

<template>
  <div class="flex justify-center items-center flex-col mt-20">
    <h1 class="text-gray-400 font-medium text-2xl">Projects</h1>
    <p class="text-gray-400 font-medium mt-2">
      Logged in as: {{user.user_metadata.username}}
    </p>
  </div>
</template>