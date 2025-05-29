import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

import { User } from '../types/userTypes'
import { refreshAccessToken } from '../utils/authenticationUtils'

// Extend the Express Request object to include the `user` property
declare global {
  namespace Express {
      interface Request {
          user?: User,
          logout: any
      }
  }
}

export const verifyUser = passport.authenticate('jwt', {session: false})

export const verifyUserAndRefreshToken = [verifyUser, refreshAccessToken]

export const isAuthenticated = [verifyUserAndRefreshToken, (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(res.status(401).json({ message: 'Unauthorized: No user data found' }))
  }

  return next()
}]

export const isAdmin = [verifyUserAndRefreshToken, (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.isAdmin) {
    return next(res.status(403).json({ message: 'Forbidden: Access is denied' }))
  }

  return next()
}]
