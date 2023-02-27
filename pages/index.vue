<script setup lang="ts">
useHead({
  title: 'Home',
});

const { useStateUser } = useAuth();

const user = useStateUser();
</script>

<template>
  <div>{{ user }}</div>
</template>
