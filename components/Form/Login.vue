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
    <FormKit type="form" submit-label="Login" @submit="handleLogin">
      <h1 class="text-xl mb-4">Login</h1>
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
    <nuxt-link to="/register">Criar conta</nuxt-link>
  </div>
</template>
