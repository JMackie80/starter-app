import { Request, Response, NextFunction, RequestHandler } from 'express'
import passport from 'passport'
import { compose } from 'compose-middleware';

import { refreshAccessToken } from '../utils/authenticationUtils'
import { User as UserType } from '../types'

// Extend the Express Request object to include the `user` property
declare global {
  namespace Express {
      interface Request {
          logout: { (options: passport.LogOutOptions, done: (err: any) => void): void; (done: (err: any) => void): void; }
          user?: User | undefined
      }
  }
}

/**
 * Middleware to verify the user using Passport's JWT strategy.
 * Ensures the user is authenticated without creating a session.
 */
export const verifyUser = passport.authenticate('jwt', {session: false})

/**
 * Middleware to verify the user and refresh the access token if necessary.
 * Combines `verifyUser` and `refreshAccessToken` middleware.
 */
export const verifyUserAndRefreshToken = [verifyUser, refreshAccessToken]

/**
 * Middleware to check if the user is authenticated.
 * Ensures the user is verified and has valid user data.
 * Responds with a 401 Unauthorized status if no user data is found.
 */
export const isAuthenticated: RequestHandler = compose([
  ...verifyUserAndRefreshToken,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user data found' })
    }

    next()
  }
])

/**
 * Middleware to check if the user is an admin.
 * Ensures the user is verified, has valid user data, and has admin privileges.
 * Responds with a 403 Forbidden status if the user is not an admin.
 */
export const isAdmin: RequestHandler = compose([
  ...verifyUserAndRefreshToken,
  (req: Request, res: Response, next: NextFunction) => {
    if (!(req.user as UserType)?.isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Access is denied' })
    }

    next()
  }
])

/**
 * Middleware to check if the user is an admin or the owner of the resource.
 * Ensures the user is verified, has valid user data, and is either an admin or the owner.
 * Responds with a 403 Forbidden status if neither condition is met.
 */
export const isAdminOrSelf: RequestHandler = compose([
  ...verifyUserAndRefreshToken,
  (req: Request, res: Response, next: NextFunction) => {
    if (!(req.user as UserType)?.isAdmin && req.params.userId !== (req.user as UserType)?.userId) {
      return res.status(403).json({ message: 'Forbidden: Access is denied' })
    }

    next()
  }
])