import { ID, User, UserLogin } from '~/types/user';
import { Token } from '~/types/token';
import jwt_decode from 'jwt-decode';

interface ResponseLogin {
  access_token: string;
  user: User;
}

interface JwtDecode {
  exp: number;
  iat: number;
  userId: ID;
}

export default () => {
  // create a new state to user and token
  const useStateToken = () => useState<Token>('auth_token');
  const useStateUser = () => useState<User>('auth_user');
  const useStateLoading = () => useState<boolean>('auth_loading', () => true);

  // set token state
  const setToken = (newToken: Token) => {
    const authToken = useStateToken();
    authToken.value = newToken;
  };

  // set user state
  const setUser = (newUser: User) => {
    const authUser = useStateUser();
    authUser.value = newUser;
  };

  // set loading state
  const setIsLoading = (value: boolean) => {
    const authLoading = useStateLoading();
    authLoading.value = value;
  };

  // sign up function
  const signUp = (data: User) => {
    return new Promise(async (resolve, reject) => {
      try {
        await $fetch('/api/auth/register', {
          method: 'POST',
          body: data,
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  // login function
  const signIn = ({ username, password }: UserLogin) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { username, password },
        });

        const { access_token, user } = data as ResponseLogin;
        setToken(access_token);
        setUser(user);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  // refresh token function
  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/refresh');

        const { access_token } = data as any;
        setToken(access_token);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
  // refresh time token function
  const reRefreshAccessToken = async () => {
    const authToken = useStateToken();

    if (!authToken.value) return;

    const jwt: JwtDecode = jwt_decode(authToken.value);

    // refreshing the token 1 minute before it expires
    let remainingTime = jwt.exp * 1000 - Date.now() - 60000;

    // if remaining time is less than 0, do nothing
    while (remainingTime > 0) {
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      // try to update the token
      try {
        await refreshToken();
        break;
      } catch (error: any) {
        console.error(`Error updating token: ${error.message}`);

        // try to update again after 30 seconds
        await new Promise((resolve) => setTimeout(resolve, 30000));
      }

      // recalculates time remaining after token refresh attempt
      const newJwt: JwtDecode = jwt_decode(useStateToken().value as string);
      remainingTime = newJwt.exp * 1000 - Date.now() - 60000;
    }
  };

  // get user with custom useFetchApi composable
  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi('/api/auth/user');

        const { user } = data as any;

        setUser(user);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  // init auth set access token
  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setIsLoading(true);
      try {
        await refreshToken();
        await getUser();

        reRefreshAccessToken();
        resolve(true);
      } catch (error) {
        reject(error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      setIsLoading(true);
      try {
        await useFetchApi('/api/auth/logout/', {
          method: 'POST',
        });

        setToken(null as any);
        setUser({} as User);
        resolve(true);
      } catch (error) {
        reject(error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return {
    signUp,
    signIn,
    logout,
    initAuth,
    useStateUser,
    useStateToken,
    useStateLoading,
  };
};
