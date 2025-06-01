import createError from 'http-errors'
import { NextFunction } from 'express'

export const handleError = (error: unknown, next: NextFunction): void => {
    if (createError.isHttpError(error)) {
        // Handle specific HTTP errors
        next(error)
    } else {
        // Handle unexpected errors
        next(createHttpError(500, 'An unexpected error occurred. Please try again later.'))
    }
}

export const createHttpError = (status: number, message: string): Error => {
    return createError(status, message)
}
