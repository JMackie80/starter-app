import request from 'supertest'
import express, { Application } from 'express'

import userProfileRoute from '../userProfileRoute'
import * as userProfileController from '../../controllers/userProfileController'

jest.mock('../../controllers/userProfileController')
jest.mock('../../middleware/authorization', () => ({
    isAdmin: jest.fn((req, res, next) => next()),
}))

const app: Application = express()
app.use(express.json())
app.use('/user-profile', userProfileRoute)

describe('userProfileRoute', () => {
    const mockUserProfile = { userId: 'test@example.com', name: 'Test User' }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('GET /user-profile', () => {
        it('should return user profile when successful', async () => {
            (userProfileController.getUserProfile as jest.Mock).mockResolvedValue(mockUserProfile)

            const response = await request(app).get('/user-profile/test@example.com')

            expect(response.status).toBe(200)
            expect(response.body).toEqual(mockUserProfile)
            expect(userProfileController.getUserProfile).toHaveBeenCalledWith('test@example.com')
        })
    })

    describe('POST /user-profile', () => {
        it('should create a user profile when successful', async () => {
            (userProfileController.createUserProfile as jest.Mock).mockResolvedValue(mockUserProfile)

            const response = await request(app).post('/user-profile/test@example.com').send(mockUserProfile)

            expect(response.status).toBe(200)
            expect(response.body).toEqual(mockUserProfile)
            expect(userProfileController.createUserProfile).toHaveBeenCalledWith(mockUserProfile)
        })
    })

    describe('PUT /user-profile', () => {
        it('should update a user profile when successful', async () => {
            (userProfileController.updateUserProfile as jest.Mock).mockResolvedValue(mockUserProfile)

            const response = await request(app).put('/user-profile/test@example.com').send(mockUserProfile).query({ email: 'test@example.com' })

            expect(response.status).toBe(200)
            expect(response.body).toEqual(mockUserProfile)
            expect(userProfileController.updateUserProfile).toHaveBeenCalledWith('test@example.com', mockUserProfile)
        })
    })

    describe('DELETE /user-profile', () => {
        it('should delete a user profile when successful', async () => {
            (userProfileController.deleteUserProfile as jest.Mock).mockResolvedValue(undefined)

            const response = await request(app).delete('/user-profile/test@example.com').query({ email: 'test@example.com' })

            expect(response.status).toBe(200)
            expect(response.text).toBe('ok')
            expect(userProfileController.deleteUserProfile).toHaveBeenCalledWith('test@example.com')
        })
    })
})