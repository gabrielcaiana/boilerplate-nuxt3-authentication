<script setup lang="ts">
const { useStateUser, initAuth, useStateLoading } = useAuth();
const user = useStateUser();
const isAuthLoading = useStateLoading();

onBeforeMount(() => {
  initAuth();
});
</script>

<template>
  <div>
    <!-- is loading -->
    <UILoading v-if="isAuthLoading" />

    <!-- is logeed in -->
    <NuxtLayout v-else-if="user">
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>

    <!-- is not logged in -->
    <AuthPage v-else />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
