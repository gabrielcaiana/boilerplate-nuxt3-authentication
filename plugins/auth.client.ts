export default defineNuxtPlugin(async () => {
  const { useStateUser, initAuth } = useAuth();

  try {
    await initAuth();
  } catch (error) {
    console.error(error);
  }

  addRouteMiddleware((to, from) => {
    const user = useStateUser();
    const publicRoutes = ['/login', '/register'];
    const router = useRouter();

    watch(user, (value) => {
      if (!value.id) router.go(0);
    });

    if (user.value && publicRoutes.includes(to.path)) {
      return { path: '/' };
    }

    if (!user.value && !publicRoutes.includes(to.path)) {
      return { path: '/login' };
    }
    return true;
  });
});
