export default defineEventHandler((event) => {
  return {
    user: event.context.auth?.user,
  };
});
