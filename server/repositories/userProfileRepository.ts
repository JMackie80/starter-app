import { PrismaClient } from '../generated/prisma'
import { UserProfile } from '../types'

const prisma = new PrismaClient()

const selectObject = {
    userId: true,
    firstName: true,
    lastName: true,
    bio: true,
    headline: true,
    profilePictureUrl: true,
    interests: true,
    createdAt: true,
    modifiedAt: true
  }

/**
 * Retrieves user profiles
 *
 * @param {string} userId - The userId for the feed.
 * @returns {UserProfile[]} The user profile object if found, otherwise null.
 */
export const getUserProfiles = async (userId: string): Promise<UserProfile[]> => {
    const userProfiles = await prisma.userProfile.findMany({
        where: { NOT: {
            userId
          } },
        select: selectObject
      })

    return userProfiles.map(mapUserProfile)
}

/**
 * Retrieves a user profile by their userId.
 *
 * @param {string} userId - The userId of the user to retrieve.
 * @returns {UserProfile | null} The user profile object if found, otherwise null.
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    const userProfile = await prisma.userProfile.findUnique({
        where: { userId },
        select: selectObject
      })
    if (!userProfile) {
        return null
    }

    return mapUserProfile(userProfile)
}

/**
 * Creates a new user Profile and adds it to the users list.
 *
 * @param {UserProfile} userProfile - The user profile object to create.
 * @returns {UserProfile} The created user object.
 */
export const createUserProfile = async (userProfile: UserProfile): Promise<UserProfile> => {
    const createdUserProfile = await prisma.userProfile.create({
        data: {
          ...userProfile,
          interests: userProfile.interests.join('|'),
        },
        select : selectObject
      })

    return mapUserProfile(createdUserProfile)
}

/**
 * Deletes a user profile by their userId.
 *
 * @param {string} userId - The userId of the user profile to delete.
 * @returns {void}
 */
export const deleteUserProfile = async (userId: string): Promise<void> => {
    await prisma.userProfile.delete({
        where: { userId },
      })

    return
}

/**
 * Updates a user's profile information.
 *
 * @param {string} userId - The userId of the user profile to update.
 * @param {UserProfile} userProfile - The updated user profile object.
 * @returns {UserProfile | null} The updated user profile object if the user exists, otherwise null.
 */
export const updateUserProfile = async (userId: string, userProfile: UserProfile): Promise<UserProfile | null> => {
    const existingUserProfile = await getUserProfile(userId)
    if (!existingUserProfile) {
        return null
    }

    const updatedUserProfile = await prisma.userProfile.update({
        where: { userId },
        data: { 
            ...existingUserProfile, 
            ...userProfile, 
            interests: userProfile.interests.join('|'),
            modifiedAt: new Date() 
        },
        select: selectObject
    })

    return mapUserProfile(updatedUserProfile)
}

const mapUserProfile = (userProfile: any): UserProfile => {
    return {
        ...userProfile,
        interests: userProfile.interests.split('|')
    }
}