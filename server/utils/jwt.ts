import jwt from 'jsonwebtoken';
import { User } from '~/types/user';
import { Token } from '~/types/token';

const config = useRuntimeConfig();

// Generate access token
const generateAccessToken = (user: User) => {
  return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
    expiresIn: '10m',
  });
};

// Generate refresh token
const generateRefreshToken = (user: User) => {
  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: '4h',
  });
};

// Generate tokens
export const generateTokens = (user: User) => {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
};

// Send access token to cookie
export const sendRefreshToken = (event: any, token: Token) => {
  setCookie(event, 'refresh_token', token, {
    httpOnly: true,
    sameSite: true,
  });
};

// Decode refresh token
export const decodeRefreshToken = (token: Token) => {
  try {
    return jwt.verify(token, config.jwtRefreshSecret);
  } catch (error) {
    return null;
  }
};

// Decode access token
export const decodeAccessToken = (token: Token) => {
  try {
    return jwt.verify(token, config.jwtAccessSecret);
  } catch (error) {
    return null;
  }
};
