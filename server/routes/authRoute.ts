import { Router, Request, Response, NextFunction } from 'express'
import passport from 'passport'

import { getToken } from '../utils/authenticationUtils'
import { loginSchema, signUpSchema } from '../schemas/authSchemas'
import { validateRequestSchema } from '../utils/schemaUtils'
import * as userController from '../controllers/userController'
import { handleError } from '../utils/errorUtils'

const router = Router()

router.post('/login', 
  validateRequestSchema(loginSchema), 
  passport.authenticate('local'), 
  (req: Request, res: Response, next: NextFunction) => {
    const token = getToken((req as any).user)
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    res.status(201).json({ success: true })
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

router.post('/signUp', 
  validateRequestSchema(signUpSchema), 
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.body.password !== req.body.confirmPassword) {
        res.status(400).json({ error: 'Passwords do not match' })
        return
      }
      
      delete req.body.confirmPassword
      await userController.createUser(req.body)
      res.status(201).json({ success: true })
    } catch (error) {
      console.error('error', error)
      handleError(error, next)
    }
  }
)

export default router
