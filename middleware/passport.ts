import { Request } from 'express'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import { getEnvironmentVariable } from '../utils/environmentVariableUtils'
import { createUser, getUser } from '../controllers/userController'

const clientId = getEnvironmentVariable('GOOGLE_CLIENT_ID')
const clientSecret = getEnvironmentVariable('GOOGLE_CLIENT_SECRET')
const jwtKey = getEnvironmentVariable('JWT_KEY')

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req: Request) => {
      return req.cookies.accessToken
    },
    ExtractJwt.fromAuthHeaderAsBearerToken()
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
  passport.use(new GoogleStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: 'http://localhost:3001/auth/google/callback'
  },
    async function(accessToken: any, refreshToken: any, profile: any, done: any) {
      // Handle user profile data here (e.g., save to a database)
      const googleEmail = profile.emails[0].value
      let user
      user = await getUser(googleEmail)
      if (!user) {
        user = await createUser({ 
          email: googleEmail,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName
        })
      }

      return done(null, user);
    }
  ))

  // Serialize and deserialize user
  passport.serializeUser(function(user, done) {
    done(null, user.email)
  })

  passport.deserializeUser(async function(id, done) {
    const user = await getUser(id)
    done(null, user)
  })
}