import UrlPattern from 'url-pattern';
import { Token } from '~/types/token';
import { decodeAccessToken } from '../utils/jwt';
import { sendError } from 'h3';
import { getUserById } from '../db/users';
import { userTransformer } from '../transformers';

interface Decoded {
  userId: string;
}

export default defineEventHandler(async (event) => {
  // Define the endpoints that will be handled by the middleware
  const endpoints = ['/api/auth/user'];

  // If the request is not handled by the endpoints, skip the middleware
  const isHandled = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);
    return pattern.match(event.node.req.url!);
  });

  if (!isHandled) return;

  // Get the token from the request header
  const token = event.node.req.headers['authorization']?.split(' ')[1] as Token;

  // Decode the token
  const decoded = decodeAccessToken(token) as Decoded;

  // If the token is invalid, return an error
  if (!decoded) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    );
  }

  // Get the user from the database
  try {
    const { userId } = decoded;
    const user = await getUserById(userId);

    event.context.auth = {
      user: userTransformer(user!),
    };
  } catch (error) {
    return;
  }
});
