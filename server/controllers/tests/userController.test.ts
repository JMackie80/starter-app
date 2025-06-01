import * as userController from '../userController'
import * as userRepository from '../../repositories/userRepository'
import { createHttpError } from '../../utils/errorUtils'

jest.mock('../../repositories/userRepository')

describe('userController', () => {
    const mockUser = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('getUsers', () => {
        it('should return an array of users', () => {
            const users = [mockUser]
            jest.spyOn(userRepository, 'getUsers').mockReturnValue(Promise.resolve(users))

            const result = userController.getUsers()

            expect(result).toEqual(users)
            expect(userRepository.getUsers).toHaveBeenCalledTimes(1)
        })

        it('should return an empty array if no users are found', () => {
            jest.spyOn(userRepository, 'getUsers').mockReturnValue(Promise.resolve([]))

            const result = userController.getUsers()

            expect(result).toEqual([])
            expect(userRepository.getUsers).toHaveBeenCalledTimes(1)
        })
    })

    describe('getUser', () => {
        it('should return a user if found', () => {
            jest.spyOn(userRepository, 'getUser').mockReturnValue(Promise.resolve(mockUser))

            const result = userController.getUser(mockUser.email)

            expect(result).toEqual(mockUser)
            expect(userRepository.getUser).toHaveBeenCalledWith(mockUser.email)
        })

        it('should throw a 404 error if user is not found', () => {
            jest.spyOn(userRepository, 'getUser').mockReturnValue(Promise.resolve(null))

            expect(() => userController.getUser(mockUser.email)).toThrow(createHttpError(404, 'Resource not found'))
            expect(userRepository.getUser).toHaveBeenCalledWith(mockUser.email)
        })
    })

    describe('createUser', () => {
        it('should create and return a user', () => {
            jest.spyOn(userRepository, 'createUser').mockReturnValue(Promise.resolve(mockUser))

            const result = userController.createUser(mockUser)

            expect(result).toEqual(mockUser)
            expect(userRepository.createUser).toHaveBeenCalledWith(mockUser)
        })
    })

    describe('deleteUser', () => {
        it('should call deleteUser with the correct email', () => {
            jest.spyOn(userRepository, 'deleteUser').mockImplementation(() => Promise.resolve())

            userController.deleteUser(mockUser.email)

            expect(userRepository.deleteUser).toHaveBeenCalledWith(mockUser.email)
        })

        it('should throw a 404 error if user does not exist', () => {
            jest.spyOn(userRepository, 'deleteUser').mockImplementation(() => {
                throw createHttpError(404, 'Resource not found')
            })

            expect(() => userController.deleteUser(mockUser.email)).toThrow(createHttpError(404, 'Resource not found'))
            expect(userRepository.deleteUser).toHaveBeenCalledWith(mockUser.email)
        })
    })

    describe('updateUser', () => {
        it('should update and return the user if successful', () => {
            const updatedUser = { ...mockUser, firstName: 'Jane' }
            jest.spyOn(userRepository, 'updateUser').mockReturnValue(Promise.resolve(updatedUser))

            const result = userController.updateUser(mockUser.email, updatedUser)

            expect(result).toEqual(updatedUser)
            expect(userRepository.updateUser).toHaveBeenCalledWith(mockUser.email, updatedUser)
        })

        it('should throw a 404 error if user is not found', () => {
            jest.spyOn(userRepository, 'updateUser').mockReturnValue(Promise.resolve(null))

            expect(() => userController.updateUser(mockUser.email, mockUser)).toThrow(createHttpError(404, 'Resource not found'))
            expect(userRepository.updateUser).toHaveBeenCalledWith(mockUser.email, mockUser)
        })
    })
})

