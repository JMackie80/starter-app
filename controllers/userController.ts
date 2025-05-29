import createError from 'http-errors'

import * as userRepository from '../repositories/userRepository'
import { User } from '../types'

/**
 * Retrieves all users.
 *
 * @returns {User[]} An array of users.
 */
export const getUsers = (): User[] => {
    return userRepository.getUsers()
}

/**
 * Retrieves a user by their email.
 *
 * @param {string} email - The email of the user to retrieve.
 * @returns {User | null} The user object if found, otherwise null.
 */
export const getUser = (email: string): User | null => {
    const user = userRepository.getUser(email)
    if (!user) {
        throw createError(404, 'Resource not found')
    }

    return user
}

/**
 * Creates a new user.
 *
 * @param {User} user - The user object to create.
 * @returns {User | undefined} The created user object, or undefined if creation fails.
 */
export const createUser = (user: User): User | undefined => {
    return userRepository.createUser(user)
}

/**
 * Deletes a user by their email.
 *
 * @param {string} email - The email of the user to delete.
 * @returns {void}
 */
export const deleteUser = (email: string): void => {
    return userRepository.deleteUser(email)
}

/**
 * Updates a user's information.
 *
 * @param {string} email - The email of the user to update.
 * @param {User} user - The updated user object.
 * @returns {User | null} The updated user object if successful, otherwise null.
 */
export const updateUser = (email: string, user: User): User | null => {
    const updatedUser = userRepository.updateUser(email, user)
    if (!updatedUser) {
        // Create a 404 error
        throw createError(404, 'Resource not found')
    }

    return updatedUser
}
