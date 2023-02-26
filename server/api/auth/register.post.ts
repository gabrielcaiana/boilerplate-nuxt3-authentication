import { User } from '~/types/user';
import { createUser } from '~/server/db/users';
import { sendError } from 'h3';
import { userTransformer } from '~/server/transformers';

export default defineEventHandler(async (event) => {
  // read the body
  const body = await readBody(event);

  // check if all the fields are present
  if (!body.username || !body.email || !body.password || !body.repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'fields missing' })
    );
  }

  // check if the passwords match
  if (body.password !== body.repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'passwords do not match' })
    );
  }

  // create the user
  const user = (await createUser({
    username: body.username,
    email: body.email,
    name: body.name || null,
    password: body.password,
    profileImage: body.profileImage || null,
  })) as User;

  return {
    body: userTransformer(user),
  };
});
