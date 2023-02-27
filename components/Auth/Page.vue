<script setup lang="ts">
const { $bus } = useNuxtApp();

const currentPage = ref('login');
const AuthLogin = resolveComponent('AuthLogin');
const AuthRegister = resolveComponent('AuthRegister');

$bus.$on('auth:form', (data: any) => {
  currentPage.value = data.page;
});
</script>

<template>
  <div class="container mx-auto p-10 flex items-center justify-center h-screen">
    <component :is="currentPage === 'login' ? AuthLogin : AuthRegister" />
  </div>
</template>
