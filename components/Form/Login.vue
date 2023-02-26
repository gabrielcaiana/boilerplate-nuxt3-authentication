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
  <FormKit type="form" submit-label="Login" @submit="handleLogin">
    <FormKit
      v-model="data.username"
      type="text"
      name="username"
      id="username"
      label="Username"
      help="Your username"
      placeholder="@username"
      validation="required"
    />

    <FormKit
      v-model="data.password"
      type="password"
      name="password"
      id="password"
      label="Password"
      help="Your password"
      placeholder="********"
      validation="required"
    />
  </FormKit>
</template>
