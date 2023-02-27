export default defineNuxtPlugin(async () => {
  const { useStateUser, initAuth } = useAuth();

  // init auth
  try {
    await initAuth();
  } catch (error) {
    console.error(error);
  }

  addRouteMiddleware((to, from) => {
    const user = useStateUser();
    const publicRoutes = ['/login', '/register'];
    const router = useRouter();

    // if user is null redirect to login
    watch(user, (value) => {
      if (!value.id) router.go(0);
    });

    // if user and route is public redirect to home
    if (user.value && publicRoutes.includes(to.path)) {
      return { path: '/' };
    }

    // if no user and route is private redirect to login
    if (!user.value && !publicRoutes.includes(to.path)) {
      return { path: '/login' };
    }
    return true;
  });
});
