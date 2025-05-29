import { Router, Request, Response, NextFunction } from 'express'
import createError from 'http-errors'

import * as userController from '../controllers/userController'
import { isAdmin } from '../middleware/authorization'

const router = Router()

router.use(isAdmin)

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(userController.getUsers())
    } catch (error) {
        if (createError.isHttpError(error)) {
            // Handle specific HTTP errors
            next(error)
        } else {
            // Handle unexpected errors
            next(createError(500, 'An unexpected error occurred. Please try again later.'))
        }
    }
})

router.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = userController.getUser(req.params.email)
        res.json(user)
    } catch (error) {
        if (createError.isHttpError(error)) {
            // Handle specific HTTP errors
            next(error)
        } else {
            // Handle unexpected errors
            next(createError(500, 'An unexpected error occurred. Please try again later.'))
        }
    }
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = userController.createUser(req.body)
        res.json(result)
    } catch (error) {
        if (createError.isHttpError(error)) {
            // Handle specific HTTP errors
            next(error)
        } else {
            // Handle unexpected errors
            next(createError(500, 'An unexpected error occurred. Please try again later.'))
        }
    }
})

router.put('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = userController.updateUser(req.params.email, req.body)
        res.json(result)
    } catch (error) {
        if (createError.isHttpError(error)) {
            // Handle specific HTTP errors
            next(error)
        } else {
            // Handle unexpected errors
            next(createError(500, 'An unexpected error occurred. Please try again later.'))
        }
    }
})

router.delete('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        userController.deleteUser(req.params.email)
        res.send('ok')
    } catch (error) {
        if (createError.isHttpError(error)) {
            // Handle specific HTTP errors
            next(error)
        } else {
            // Handle unexpected errors
            next(createError(500, 'An unexpected error occurred. Please try again later.'))
        }
    }
})

export default router
