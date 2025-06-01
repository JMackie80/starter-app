import { Router, Request, Response, NextFunction } from 'express'

import { handleError } from '../utils/errorUtils'
import * as userController from '../controllers/userController'
import { isAdmin } from '../middleware/authorization'
import { deleteUserSchema, getUserSchema, patchUserSchema, postUserSchema } from '../schemas/userSchemas'
import { validateRequestSchema } from '../utils/schemaUtils'

const router = Router()

router.use(isAdmin)

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userController.getUsers()
        res.json(users)
    } catch (error) {
        handleError(error, next)
    }
})

router.get('/:email', validateRequestSchema(getUserSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userController.getUser(req.params.email)
        res.json(user)
    } catch (error) {
        handleError(error, next)
    }
})

router.post('/', validateRequestSchema(postUserSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Creating user with data:', req.body)
        const result = await userController.createUser(req.body)
        res.json(result)
    } catch (error) {
        handleError(error, next)
    }
})

router.patch('/:email', validateRequestSchema(patchUserSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userController.updateUser(req.params.email, req.body)
        res.json(result)
    } catch (error) {
        handleError(error, next)
    }
})

router.delete('/:email', validateRequestSchema(deleteUserSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.deleteUser(req.params.email)
        res.send('ok')
    } catch (error) {
        handleError(error, next)
    }
})

export default router
