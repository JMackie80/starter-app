import { z } from 'zod'

import { email, password } from '../utils/schemaUtils'

export const loginSchema = {
    body: z.object({
        email: email,
        password: password
    })
}

export const signUpSchema = {
    body: z.object({
        email: email,
        password: password,
        confirmPassword: password
    })
}
