import { Router, Request, Response, NextFunction } from 'express'
import passport from 'passport'

import { getToken } from '../utils/authenticationUtils'
import { getEnvironmentVariable } from '../utils/environmentVariableUtils'

const clientUrl = getEnvironmentVariable('CLIENT_URL')

const router = Router()

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: `${clientUrl}/login` }),
  function(req, res) {
    const token = getToken((req as any).user)
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    res.redirect(`${clientUrl}/oauth?token=${token}`);
  }
)

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  (req as any).logout((err: Error) => {
    if (err) { 
      console.error(err)
    }
  })
  res.json({ success: true })
})

export default router
