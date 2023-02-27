<script setup lang="ts">
useHead({
  title: 'Home',
});

const { useStateUser, logout } = useAuth();
const user = useStateUser();

const handleLogout = () => {
  logout();
};
</script>

<template>
  <div>
    <pre>{{ user }}</pre>

    <UIButton @click="handleLogout" label="Logout" />
  </div>
</template>
