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
    <FormKit type="form" submit-label="Criar conta" @submit="handleRegister">
      <h1 class="text-xl mb-4">Criar conta</h1>
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

      <FormKit
        v-model="data.confirmPassword"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        label="Confirm password"
        help="Confirm your password"
        placeholder="********"
        validation="required"
      />
    </FormKit>
    <nuxt-link to="/login">Login</nuxt-link>
  </div>
</template>
