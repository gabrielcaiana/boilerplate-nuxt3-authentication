import { Token } from '~/types/token';
import { ID } from '~/types/user';
import { prisma } from '.';

interface RefreshToken {
  token: Token;
  userId: ID;
}

// create a new refresh token
export const createRefreshToken = ({ token, userId }: RefreshToken) => {
  return prisma.refreshToken.create({
    data: {
      token,
      userId,
    },
  });
};

// get a refresh token by token
export const getRefreshTokenByToken = (token: Token) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};

// delete a refresh token by user id
export const deleteRefreshToken = (token: Token) => {
  return prisma.refreshToken.delete({
    where: {
      token,
    },
  });
};
