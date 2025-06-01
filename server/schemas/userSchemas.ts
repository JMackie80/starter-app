import { z } from 'zod'

import { coerceBoolean, password, email } from '../utils/schemaUtils'

const emailObject = z.object({ email: email })

const userSchema = z.object({
    isAdmin: coerceBoolean().optional()
})

export const postUserSchema = {
    body: userSchema.extend({
        email: email,
        password: password
    })
}

export const patchUserSchema = {
    params: emailObject,
    body: userSchema
}

export const deleteUserSchema = {
    params: emailObject
}

export const getUserSchema = {
    params: emailObject
}


