<script setup lang="ts">
useHead({
  title: 'Registre-se',
});

const router = useRouter();

const data = reactive({
  name: '',
  username: '',
  email: '',
  profileImage: '',
  password: '',
  repeatPassword: '',
});

const handleRigister = () => {
  alert(JSON.stringify(data));
};

const handleLoginPage = () => {
  router.push('/login');
};
</script>

<template>
  <div class="container mx-auto p-10 h-full flex items-center justify-center">
    <VForm @submit="handleRigister" class="flex flex-col gap-4 p-10 w-2/5">
      <h1 class="text-2xl font-medium text-gray-700">Crie sua conta</h1>
      <div>
        <VField
          type="text"
          name="name"
          rules="required|minMax:5,20"
          placeholder="Enter name"
          class="block border border-gray-400 p-2 rounded-md w-full"
        />
        <VErrorMessage name="name" class="text-red-500" />
      </div>

      <div>
        <VField
          type="text"
          name="username"
          rules="required|minMax:5,12"
          placeholder="Enter username"
          class="block border border-gray-400 p-2 rounded-md w-full"
        />
        <VErrorMessage name="username" class="text-red-500" />
      </div>

      <div>
        <VField
          type="email"
          name="email"
          rules="required|email"
          placeholder="Enter email"
          class="block border border-gray-400 p-2 rounded-md w-full"
        />
        <VErrorMessage name="email" class="text-red-500" />
      </div>

      <div>
        <VField
          type="text"
          name="profileImage"
          rules="required|url"
          placeholder="Enter profile image url"
          class="block border border-gray-400 p-2 rounded-md w-full"
        />
        <VErrorMessage name="profileImage" class="text-red-500" />
      </div>

      <div>
        <VField
          type="password"
          name="password"
          rules="required|minMax:5,16"
          placeholder="Enter password"
          class="block border border-gray-400 p-2 rounded-md w-full"
        />
        <VErrorMessage name="password" class="text-red-500" />
      </div>

      <div>
        <VField
          type="password"
          name="repeatPassword"
          rules="required|minMax:5,16|confirmed:password"
          placeholder="Repeat password"
          class="block border border-gray-400 p-2 rounded-md w-full"
        />
        <VErrorMessage name="repeatPassword" class="text-red-500" />
      </div>

      <UIButton label="Criar conta" type="submit" />
      <UIButton
        label="Ir para pagina de login"
        type="button"
        color="secondary"
        @click="handleLoginPage"
      />
    </VForm>
  </div>
</template>
