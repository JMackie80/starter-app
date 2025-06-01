import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { getEnvironmentVariable } from '../utils/environmentVariableUtils'

const jwtKey = getEnvironmentVariable('JWT_KEY')
if (!jwtKey) {
  throw new Error('JWT_KEY is not defined in the environment variables')
}

const tokenExpiry = Number(process.env.TOKEN_EXPIRY) || 3600

/**
 * Generates a JSON Web Token (JWT) for the given user.
 *
 * @param user - The user object to include in the token payload.
 * @returns A signed JWT string with the user information.
 * @throws Will throw an error if the JWT key is not defined in the environment variables.
 */
export const getToken = (user: any) => {
  return jwt.sign(user, jwtKey, {expiresIn: tokenExpiry})
}

/**
 * Middleware to refresh the access token for authenticated users.
 *
 * This middleware checks for an existing access token in the request cookies.
 * If a token is found and the user information is present in the request, it generates
 * a new token with the same payload and sets it in the response cookies.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 * @throws Will throw an error if the user information is missing in the request.
 */
export const refreshAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken
  if (!token) return next()
  // Generate a new token and set it in the cookie
  if (!req.user) {
    return next(new Error('User information is missing in the request'))
  }
  const newToken = jwt.sign(req.user, jwtKey, {
      expiresIn: tokenExpiry,
  })
  res.cookie('accessToken', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
  })
  return next()
}
