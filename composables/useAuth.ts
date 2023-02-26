import { User } from '~/types/user';

export default () => {
  const signUp = (data: User) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await $fetch('/api/auth/register', {
          method: 'POST',
          body: data,
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    signUp,
  };
};
