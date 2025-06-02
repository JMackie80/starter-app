import { z, ZodIssue } from 'zod'
import { NextFunction, Request, Response } from 'express'

import { createHttpError } from './errorUtils'
import { RequestSchema } from '../types/requestTypes'

export const coerceBoolean = () =>
  z.preprocess((val) => {
    if (typeof val === 'string') return val.toLowerCase() === 'true'
    return Boolean(val);
  }, z.boolean())

export const allowedString = () => 
  z.string()
  .regex(/^[a-zA-Z0-9'",.\- ]*$/, {
    message: 'Only letters, numbers, apostrophes, periods, commas, dashes, and spaces are allowed.',
  })

export const userId = z.string().uuid({ message: 'userId must be a valid UUID' })
export const email = z.string().email().max(50)
export const password = z.string()
            .min(12, { message: 'Password must be at least 12 characters long' })
            .max(64, { message: 'Password must be at most 64 characters long' })
            .regex(/[a-z]/, { message: 'Password must include a lowercase letter' })
            .regex(/[A-Z]/, { message: 'Password must include an uppercase letter' })
            .regex(/[0-9]/, { message: 'Password must include a number' })
            .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Password must include a special character' })

export const validateRequestSchema = (schema: RequestSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schema.params) {
      const result = schema.params.strict().safeParse(req.params)
      if (!result.success) {
        return throwSchemaError(result as z.SafeParseError<any>, next)
      }
    }

    if (schema.query) {
      const result = schema.query.strict().safeParse(req.query)
      if (!result.success) {
        return throwSchemaError(result as z.SafeParseError<any>, next)
      }
    }

    if (schema.body) {
      const result = schema.body.strict().safeParse(req.body)
      if (!result.success) {
        return throwSchemaError(result as z.SafeParseError<any>, next)
      }
    }

    next()
  }
}

const throwSchemaError = (result: z.SafeParseError<any>, next: NextFunction) => {
  const errors: string[] = result.error.issues.map((e: ZodIssue) => `${e.path.join('.')}: ${e.message}`)
  next(createHttpError(400, errors.join('\n')))
}