import * as argon2 from 'argon2'

import { createHttpError } from '../utils/errorUtils'
import { PrismaClient } from '../generated/prisma'
import { User } from '../types'

const prisma = new PrismaClient()

const selectObject = {
    userId: true,
    email: true,
    isAdmin: true,
    createdAt: true,
    modifiedAt: true
  }

/**
 * Retrieves all users.
 *
 * @returns {User[]} An array of all users.
 */
export const getUsers = async (): Promise<User[]> => {
    return prisma.user.findMany({
        where: { deletedAt: null },
        select: selectObject
      })
}

/**
 * Retrieves a user by their email.
 *
 * @param {string} email - The email of the user to retrieve.
 * @returns {User | null} The user object if found, otherwise null.
 */
export const getUser = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { email, deletedAt: null },
        select: selectObject
      })
}

/**
 * Retrieves a user by their email.
 *
 * @param {string} email - The email of the user to retrieve.
 * @returns {User | null} The user object if found, otherwise null.
 */
export const getUserPassword = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { email, deletedAt: null},
        select: {
            userId: true,
            email: true,
            password: true,
            lockedAt: true
          }
      })
}

/**
 * Creates a new user and adds it to the users list.
 *
 * @param {User} user - The user object to create.
 * @returns {User} The created user object.
 */
export const createUser = async (user: User): Promise<User> => {
    if (!user.password) {
        throw createHttpError(400, 'Password is required to create a user.')
    }

    const hash = await argon2.hash(user.password)
    const createdUser = await prisma.user.create({
        data: {
          ...user, password: hash
        },
        select: selectObject
      })

    return createdUser
}

/**
 * Deletes a user by their email.
 *
 * @param {string} email - The email of the user to delete.
 * @returns {void}
 */
export const deleteUser = async (email: string): Promise<void> => {
    await prisma.user.update({
        where: { email, deletedAt: null },
        data: { deletedAt: new Date() },
      })

    return
}

/**
 * Updates an existing user's information.
 *
 * @param {string} email - The email of the user to update.
 * @param {User} user - The updated user object.
 * @returns {User | null} The updated user object if the user exists, otherwise null.
 */
export const updateUser = async (email: string, user: User): Promise<User | null> => {
    delete user.password // Ensure password is not updated
    const existingUser = await getUser(email)
    if (!existingUser) {
        return null
    }

    const updatedUser = await prisma.user.update({
        where: { email, deletedAt: null },
        data: { ...existingUser, ...user, modifiedAt: new Date() },
        select: selectObject
      })

    return updatedUser
}
