import { createHttpError } from '../utils/errorUtils'
import * as userRepository from '../repositories/userRepository'
import { User } from '../types'

/**
 * Retrieves all users.
 *
 * @returns {User[]} An array of users.
 */
export const getUsers = async (): Promise<User[]> => {
    return userRepository.getUsers()
}

/**
 * Retrieves a user by their email.
 *
 * @param {string} email - The email of the user to retrieve.
 * @returns {User | null} The user object if found, otherwise null.
 */
export const getUser = async (email: string): Promise<User | null> => {
    const user = await userRepository.getUser(email)
    if (!user) {
        throw createHttpError(404, 'Resource not found')
    }

    return user
}

/**
 * Creates a new user.
 *
 * @param {User} user - The user object to create.
 * @returns {User | undefined} The created user object, or undefined if creation fails.
 */
export const createUser = async (user: User): Promise<User | undefined> => {
    const existingUser = await userRepository.getUser(user.email)
    if (existingUser) {
        throw createHttpError(400, 'User already exists')
    }
    
    return userRepository.createUser(user)
}

/**
 * Deletes a user by their email.
 *
 * @param {string} email - The email of the user to delete.
 * @returns {void}
 */
export const deleteUser = async (email: string): Promise<void> => {
    return userRepository.deleteUser(email)
}

/**
 * Updates a user's information.
 *
 * @param {string} email - The email of the user to update.
 * @param {User} user - The updated user object.
 * @returns {User | null} The updated user object if successful, otherwise null.
 */
export const updateUser = async (email: string, user: User): Promise<User | null> => {
    const updatedUser = await userRepository.updateUser(email, user)
    if (!updatedUser) {
        throw createHttpError(404, 'Resource not found')
    }

    return updatedUser
}
