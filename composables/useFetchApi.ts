export default (url: string, options: any = {}) => {
  // get the current state of token
  const { useStateToken } = useAuth();
  const token = useStateToken();

  // request api with token
  return $fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      authorization: `Bearer ${token.value}`,
    },
  });
};
