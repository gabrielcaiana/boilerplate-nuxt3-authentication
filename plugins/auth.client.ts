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

    if (user.value && publicRoutes.includes(to.path)) {
      return { path: '/' };
    }

    if (!user.value && !publicRoutes.includes(to.path)) {
      return { path: '/login' };
    }

    return true;
  });
});
