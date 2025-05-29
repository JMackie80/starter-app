import { users } from '../data'
import { User } from '../types'


/**
 * Retrieves all users.
 *
 * @returns {User[]} An array of all users.
 */
export const getUsers = (): User[] => {
    return users
}

/**
 * Retrieves a user by their email.
 *
 * @param {string} email - The email of the user to retrieve.
 * @returns {User | null} The user object if found, otherwise null.
 */
export const getUser = (email: string): User | null => {
    return users.find((user: User) => user.email === email) || null
}

/**
 * Creates a new user and adds it to the users list.
 *
 * @param {User} user - The user object to create.
 * @returns {User} The created user object.
 */
export const createUser = (user: User): User => {
    users.push(user)
    return user
}

/**
 * Deletes a user by their email.
 *
 * @param {string} email - The email of the user to delete.
 * @returns {void}
 */
export const deleteUser = (email: string): void => {
    const index = users.findIndex((user) => user.email === email);
    if (index !== -1) {
        users.splice(index, 1);
    }
}

/**
 * Updates an existing user's information.
 *
 * @param {string} email - The email of the user to update.
 * @param {User} user - The updated user object.
 * @returns {User | null} The updated user object if the user exists, otherwise null.
 */
export const updateUser = (email: string, user: User): User | null => {
    const currentUser = getUser(email)
    if (!currentUser) {
        return null
    }

    if (currentUser) {
        currentUser.firstName = user.firstName
        currentUser.lastName = user.lastName
    }

    return currentUser
}
