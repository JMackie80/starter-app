import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { getEnvironmentVariable } from '../utils/environmentVariableUtils'

const jwtKey = getEnvironmentVariable('JWT_KEY')
const tokenExpiry = 3600

export const getToken = (user: any) => {
  return jwt.sign(user, jwtKey, {expiresIn: tokenExpiry})
}

export const refreshAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken
  if (!token) return next()
  // Generate a new token and set it in the cookie
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