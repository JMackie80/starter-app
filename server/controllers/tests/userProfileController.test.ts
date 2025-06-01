import { createHttpError } from '../../utils/errorUtils'
import * as userProfileRepository from '../../repositories/userProfileRepository'
import { getUserProfile, createUserProfile, deleteUserProfile, updateUserProfile } from '../userProfileController'
import { UserProfile } from '../../types'

jest.mock('../../repositories/userProfileRepository')

describe('userProfileController', () => {
    const mockUser: UserProfile = {
        userId: '123',
        firstName: 'John ',
        lastName: 'Doe',
        interests: ['reading', 'hiking']
    }

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('getUserProfile', () => {
        it('should return a user profile if found', async () => {
            jest.spyOn(userProfileRepository, 'getUserProfile').mockResolvedValue(mockUser)

            const result = await getUserProfile('123')

            expect(result).toEqual(mockUser)
            expect(userProfileRepository.getUserProfile).toHaveBeenCalledWith('123')
        })

        it('should throw a 404 error if user profile is not found', async () => {
            jest.spyOn(userProfileRepository, 'getUserProfile').mockResolvedValue(null)

            await expect(getUserProfile('123')).rejects.toThrow(createHttpError(404, 'Resource not found'))
            expect(userProfileRepository.getUserProfile).toHaveBeenCalledWith('123')
        })
    })

    describe('createUserProfile', () => {
        it('should create and return a new user profile', async () => {
            jest.spyOn(userProfileRepository, 'createUserProfile').mockResolvedValue(mockUser)

            const result = await createUserProfile(mockUser)

            expect(result).toEqual(mockUser)
            expect(userProfileRepository.createUserProfile).toHaveBeenCalledWith(mockUser)
        })
    })

    describe('deleteUserProfile', () => {
        it('should delete a user profile', async () => {
            jest.spyOn(userProfileRepository, 'deleteUserProfile').mockResolvedValue()

            await deleteUserProfile('123')

            expect(userProfileRepository.deleteUserProfile).toHaveBeenCalledWith('123')
        })
    })

    describe('updateUserProfile', () => {
        it('should update and return the user profile if successful', async () => {
            jest.spyOn(userProfileRepository, 'updateUserProfile').mockResolvedValue(mockUser)

            const result = await updateUserProfile('123', mockUser)

            expect(result).toEqual(mockUser)
            expect(userProfileRepository.updateUserProfile).toHaveBeenCalledWith('123', mockUser)
        })

        it('should throw a 404 error if user profile is not found', async () => {
            jest.spyOn(userProfileRepository, 'updateUserProfile').mockResolvedValue(null)

            await expect(updateUserProfile('123', mockUser)).rejects.toThrow(createHttpError(404, 'Resource not found'))
            expect(userProfileRepository.updateUserProfile).toHaveBeenCalledWith('123', mockUser)
        })
    })
})