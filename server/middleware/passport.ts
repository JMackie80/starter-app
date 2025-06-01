import { Request } from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import argon2 from 'argon2'

import { getEnvironmentVariable } from '../utils/environmentVariableUtils'
import { getUser } from '../controllers/userController'
import { User } from '../types'
import * as userRepository from '../repositories/userRepository'

const jwtKey = getEnvironmentVariable('JWT_KEY')

interface LocalStrategyOptions {
  usernameField: string;
}

interface VerifyCallback {
  (error: any, user?: any, options?: { message: string }): void;
}

if (!jwtKey) {
  throw new Error('JWT_KEY environment variable is not defined')
}

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req: Request) => {
      return req.cookies.accessToken
    },
    (req: Request) => {
      const authHeader = req.headers.authorization
      if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1]
      }
      return null
    },
  ]),
  secretOrKey: jwtKey
}

export const jwtPassport = passport.use(
  new JwtStrategy(
    opts,
    async (jwtPayload: any, done: any) => {
      try {
        const user = await getUser(jwtPayload.email)
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      } catch (err) {
        done(err, false)
      }
    }
  )
)

export const setupPassport = () => {


  passport.use(
    new LocalStrategy(
      { usernameField: 'email' } as LocalStrategyOptions,
      async (email: string, password: string, done: VerifyCallback) => {
        try {
          const user: User | null = await userRepository.getUserPassword(email);
          if (!user) return done(null, false, { message: 'Incorrect email.' });

          const match: boolean = await argon2.verify(user?.password || '', password);
          if (!match) return done(null, false, { message: 'Incorrect password.' });

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  )

  // Serialize and deserialize user
  passport.serializeUser(function(user: any, done) {
    done(null, (user as User)?.email)
  })

  passport.deserializeUser(async function(id: string, done) {
      const user = await getUser(id)
      done(null, user)
    })
}