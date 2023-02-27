<script setup lang="ts">
useHead({
  title: 'Login',
});

const { $bus } = useNuxtApp();

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
    router.push('/');
  } catch (error) {
    console.error(error);
    $bus.$emit('toast', { message: error, type: 'error' });
  } finally {
    data.loading = false;
  }
};

const handleRegisterPage = () => {
  $bus.$emit('auth:form', { page: 'register' });
};
</script>

<template>
  <VForm @submit="handleLogin" class="flex flex-col gap-4 p-10 w-2/5">
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

    <div class="flex items-center justify-center w-full" v-if="data.loading">
      <UISpinner />
    </div>
    <div class="flex flex-col w-full gap-2" v-else>
      <UIButton label="Login" type="submit" />
      <UIButton
        label="Cadastre-se"
        type="button"
        color="secondary"
        @click="handleRegisterPage"
      />
    </div>
  </VForm>
</template>
