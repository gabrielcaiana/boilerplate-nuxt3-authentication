<script setup lang="ts">
const { useStateLoading } = useAuth();
const isLoading = useStateLoading();
</script>

<template>
  <div>
    <UILoading v-if="isLoading" />
    <NuxtLayout v-else>
      <NuxtPage />
    </NuxtLayout>
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
