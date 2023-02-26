export default defineNuxtRouteMiddleware((to, from) => {
  const isLogged = false;

  const routesPublics = ['/login', '/register'];

  if (!isLogged && !routesPublics.includes(to.path)) {
    return navigateTo('/login', { redirectCode: 401 });
  }

  return;
});
