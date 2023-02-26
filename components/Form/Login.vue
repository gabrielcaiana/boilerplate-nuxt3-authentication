<script setup lang="ts">
const data = reactive({
  username: '',
  password: '',
});

const handleLogin = () => {
  // Do something with the data
  alert(JSON.stringify(data));
};
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-xl mb-4">Login</h1>
  </div>
</template>
