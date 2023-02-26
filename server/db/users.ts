import { prisma } from '.';
import { User, ID } from '~/types/user';
import bcrypt from 'bcrypt';

// create a new user
export const createUser = async (userData: User) => {
  const verifyUserExists = await getUserByUsername(userData.username);

  // if the user already exists, throw an error
  if (verifyUserExists) {
    throw createError({
      statusCode: 400,
      statusMessage: 'user already exists',
    });
  }

  // hash the password
  const data = {
    ...userData,
    password: bcrypt.hashSync(userData.password, 10),
  };

  return prisma.user.create({ data });
};

// get a user by username
export const getUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
};

// get a user by id
export const getUserById = (id: ID) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};
