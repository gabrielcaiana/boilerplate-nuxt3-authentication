import bcrypt from 'bcrypt';
import { getUserByUsername } from '~/server/db/users';
import { generateTokens, sendRefreshToken } from '~/server/utils/jwt';
import { userTransformer } from '~/server/transformers';
import { createRefreshToken } from '~/server/db/refreshTokens';
import { sendError } from 'h3';
import { User } from '~/types/user';

export default defineEventHandler(async (event) => {
  // read body
  const body = await readBody(event);
  const { username, password } = body;

  // check if username and password are provided
  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'fields missing',
      })
    );
  }

  // check if username exists
  const user = (await getUserByUsername(username)) as User;

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'username or password is invalid',
      })
    );
  }

  // check if password is correct
  const doesThePasswordMatch = await bcrypt.compare(password, user.password);

  if (!doesThePasswordMatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'username or password is invalid',
      })
    );
  }

  // generate access and refresh token
  const { accessToken, refreshToken } = generateTokens(user);

  // save refresh token to db
  await createRefreshToken({
    token: refreshToken,
    userId: user.id!,
  });

  // save refresh token to cookie and add httpOnly flag
  sendRefreshToken(event, refreshToken);

  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});
