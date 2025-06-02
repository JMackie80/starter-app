import { Router, Request, Response, NextFunction } from 'express'

import { handleError } from '../utils/errorUtils'
import * as userProfileController from '../controllers/userProfileController'
import { isAuthenticated } from '../middleware/authorization'
import { User } from '../types'
import { validateRequestSchema } from '../utils/schemaUtils'
import { getUserProfilesSchema, patchUserProfileSchema, postUserProfileSchema } from '../schemas/userProfileSchemas'

const router = Router()

router.use(isAuthenticated)

router.get('/', validateRequestSchema(getUserProfilesSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userProfileController.getUserProfiles((req.user as User)?.userId)
        res.json(user)
    } catch (error) {
        handleError(error, next)
    }
})

router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userProfileController.getUserProfile((req.user as User)?.userId)
        res.json(user)
    } catch (error) {
        handleError(error, next)
    }
})

router.post('/', validateRequestSchema(postUserProfileSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userProfileController.createUserProfile({
            ...req.body,
            userId: (req.user as User)?.userId,
            interests: req.body.interests?.split(',').map((interest: string) => interest.trim())
        })
        res.status(201).json(result)
    } catch (error) {
        handleError(error, next)
    }
})

router.patch('/me', validateRequestSchema(patchUserProfileSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userProfileController.updateUserProfile((req.user as User)?.userId, {
            ...req.body,
            userId: (req.user as User)?.userId,
            interests: req.body.interests?.split(',').map((interest: string) => interest.trim())
        })
        res.json(result)
    } catch (error) {
        handleError(error, next)
    }
})

router.delete('/me', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userProfileController.deleteUserProfile((req.user as User)?.userId)
        res.send('ok')
    } catch (error) {
        handleError(error, next)
    }
})

export default router
