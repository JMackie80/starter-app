import { z } from 'zod'

import { allowedString, userId } from '../utils/schemaUtils'

const firstName = allowedString().max(50, { message: 'firstName must be at most 50 characters long' })
const lastName = allowedString().max(50, { message: 'lastName must be at most 50 characters long' })
const interests = allowedString().max(250, { message: 'interest must be at most 250 characters long' })

const userProfileSchema = z.object({
    bio: allowedString().max(300, { message: 'bio must be at most 300 characters long' }).optional(),
    headline: allowedString().max(150, { message: 'headline must be at most 150 characters long' }).optional(),
    profilePictureUrl: z.string().max(300, { message: 'picutre url must be at most 300 characters long' }).optional()
})

export const createUserProfileSchema = userProfileSchema.extend({
    firstName: firstName,
    lastName: lastName,
    interests: interests
})

export const updateUserProfileSchema = userProfileSchema.extend({
    firstName: firstName.optional(),
    lastName: lastName.optional(),
    interests: interests.optional()
})

export const getUserProfilesSchema = {
    query: z.object({
        limit: z.coerce.number().int().min(1).max(100).default(10),
        offset: z.coerce.number().int().min(0).default(0)
    })
}

export const patchUserProfileSchema = {
    body: updateUserProfileSchema
}

export const postUserProfileSchema = {
    body: createUserProfileSchema
}
