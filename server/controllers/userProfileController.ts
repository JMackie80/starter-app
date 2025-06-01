import { createHttpError } from '../utils/errorUtils'
import * as userProfileRepository from '../repositories/userProfileRepository'
import { UserProfile } from '../types'

/**
 * Retrieves user profiles for feed.
 *
 * @param {string} userId - The userId for the feed.
 * @returns {UserProfile[]} The user object if found, otherwise null.
 */
export const getUserProfiles = async (userId: string): Promise<UserProfile[]> => {
    return userProfileRepository.getUserProfiles(userId)
}

/**
 * Retrieves a user profile by their userId.
 *
 * @param {string} userId - The userId of the user profile to retrieve.
 * @returns {UserProfile | null} The user object if found, otherwise null.
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    const userProfile = await userProfileRepository.getUserProfile(userId)
    if (!userProfile) {
        throw createHttpError(404, 'Resource not found')
    }

    return userProfile
}

/**
 * Creates a new user profile.
 *
 * @param {UserProfile} user - The user object to create.
 * @returns {UserProfile | undefined} The created user object, or undefined if creation fails.
 */
export const createUserProfile = async (user: UserProfile): Promise<UserProfile | undefined> => {
    return userProfileRepository.createUserProfile(user)
}

/**
 * Deletes a user profile by their userId.
 *
 * @param {string} userId - The userId of the user to delete.
 * @returns {void}
 */
export const deleteUserProfile = async (userId: string): Promise<void> => {
    return userProfileRepository.deleteUserProfile(userId)
}

/**
 * Updates a user's profile information.
 *
 * @param {string} userId - The userId of the user to update.
 * @param {UserProfile} user - The updated user object.
 * @returns {UserProfile | null} The updated user object if successful, otherwise null.
 */
export const updateUserProfile = async (userId: string, user: UserProfile): Promise<UserProfile | null> => {
    const updatedUserProfile = await userProfileRepository.updateUserProfile(userId, user)
    if (!updatedUserProfile) {
        throw createHttpError(404, 'Resource not found')
    }

    return updatedUserProfile
}
