import { sendError } from 'h3';
import { getRefreshTokenByToken } from '~/server/db/refreshTokens';
import { decodeRefreshToken, generateTokens } from '~/server/utils/jwt';
import { getUserById } from '~/server/db/users';

export default defineEventHandler(async (event) => {
  // Get the refresh token from the cookie
  const refresh_token = getCookie(event, 'refresh_token');

  // If the refresh token is invalid, return an error
  if (!refresh_token) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Refresh token is invalid',
      })
    );
  }

  // Get the refresh token from the database
  const dbToken = await getRefreshTokenByToken(refresh_token);

  // If the refresh token is invalid, return an error
  if (!dbToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Refresh token is invalid',
      })
    );
  }

  // Decode the refresh token
  const token = decodeRefreshToken(refresh_token);
  const { userId } = token as any;

  try {
    const user = await getUserById(userId);

    const { accessToken } = generateTokens(user!);

    return {
      access_token: accessToken,
    };
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Something went wrong',
      })
    );
  }
});
