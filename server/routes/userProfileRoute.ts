import { Router, Request, Response, NextFunction } from 'express'

import { handleError } from '../utils/errorUtils'
import * as userProfileController from '../controllers/userProfileController'
import { isAdminOrSelf, isAuthenticated } from '../middleware/authorization'
import { User } from '../types'
import { validateRequestSchema } from '../utils/schemaUtils'
import { deleteUserProfileSchema, getUserProfileSchema, getUserProfilesSchema, patchUserProfileSchema, postUserProfileSchema } from '../schemas/userProfileSchemas'

const router = Router()

router.use(isAuthenticated)

router.get('/', validateRequestSchema(getUserProfilesSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userProfileController.getUserProfiles((req.user as User)?.userId || '')
        res.json(user)
    } catch (error) {
        handleError(error, next)
    }
})

router.use(isAdminOrSelf)

router.get('/:userId', validateRequestSchema(getUserProfileSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userProfileController.getUserProfile(req.params.userId)
        res.json(user)
    } catch (error) {
        handleError(error, next)
    }
})

router.post('/:userId', validateRequestSchema(postUserProfileSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userProfileController.createUserProfile(req.body)
        res.json(result)
    } catch (error) {
        handleError(error, next)
    }
})

router.patch('/:userId', validateRequestSchema(patchUserProfileSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userProfileController.updateUserProfile(req.params.userId, req.body)
        res.json(result)
    } catch (error) {
        handleError(error, next)
    }
})

router.delete('/:userId', validateRequestSchema(deleteUserProfileSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userProfileController.deleteUserProfile(req.params.userId)
        res.send('ok')
    } catch (error) {
        handleError(error, next)
    }
})

export default router
