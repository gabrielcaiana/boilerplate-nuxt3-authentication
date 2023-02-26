// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],
  typescript: {
    strict: true,
  },
});
