<script setup lang="ts">
const data = reactive({
  username: '',
  password: '',
  confirmPassword: '',
});

const handleRegister = () => {
  // Do something with the data
  alert(JSON.stringify(data));
};
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-xl mb-4">Criar conta</h1>
  </div>
</template>
