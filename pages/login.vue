<script setup lang="ts">
useHead({
  title: 'Login',
});

const { signIn } = useAuth();

const router = useRouter();

const data = reactive({
  username: '',
  password: '',
  loading: false,
});

const handleLogin = async () => {
  data.loading = true;
  try {
    await signIn({ username: data.username, password: data.password });
  } catch (error) {
    console.error(error);
  } finally {
    data.loading = false;
  }
};

const handleRegisterPage = () => {
  router.push('/register');
};
</script>

<template>
  <div class="container mx-auto p-10 h-full flex items-center justify-center">
    <UISpinner v-if="data.loading" />
    <VForm v-else @submit="handleLogin" class="flex flex-col gap-4 p-10 w-2/5">
      <h1 class="text-2xl font-medium text-gray-700">Faça Login</h1>
      <div>
        <VField
          v-model="data.username"
          type="text"
          name="username"
          rules="required"
          placeholder="Enter username"
          class="block border border-gray-400 p-2 rounded-md w-full"
        />
        <VErrorMessage name="username" class="text-red-500" />
      </div>

      <div>
        <VField
          v-model="data.password"
          type="password"
          name="password"
          rules="required"
          placeholder="Enter password"
          class="block border border-gray-400 p-2 rounded-md w-full"
        />
        <VErrorMessage name="password" class="text-red-500" />
      </div>

      <UIButton label="Login" type="submit" />
      <UIButton
        label="Cadastre-se"
        type="button"
        color="secondary"
        @click="handleRegisterPage"
      />
    </VForm>
  </div>
</template>
