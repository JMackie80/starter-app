import request from 'supertest'
import express, { Application } from 'express'

import userRoute from '../userRoute'
import * as userController from '../../controllers/userController'

jest.mock('../../controllers/userController')
jest.mock('../../middleware/authorization', () => ({
    isAdmin: jest.fn((req, res, next) => next()),
}))

const app: Application = express()
app.use(express.json())
app.use('/users', userRoute)

describe('User Route', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('GET /users', () => {
        it('should return a list of users', async () => {
            const mockUsers = [{ email: 'test@example.com', firstName: 'Test', lastName: 'User' }]
            jest.spyOn(userController, 'getUsers').mockReturnValue(Promise.resolve(mockUsers))

            const response = await request(app).get('/users')

            expect(response.status).toBe(200)
            expect(response.body).toEqual(mockUsers)
            expect(userController.getUsers).toHaveBeenCalled()
        })
    })

    describe('GET /users/:email', () => {
        it('should return a user by email', async () => {
            const mockUser = { email: 'test@example.com', firstName: 'Test', lastName: 'User' }
            jest.spyOn(userController, 'getUser').mockReturnValue(Promise.resolve(mockUser))

            const response = await request(app).get('/users/test@example.com')

            expect(response.status).toBe(200)
            expect(response.body).toEqual(mockUser)
            expect(userController.getUser).toHaveBeenCalledWith('test@example.com')
        })
    })

    describe('POST /users', () => {
        it('should create a new user', async () => {
            const mockUser = { email: 'test@example.com', firstName: 'Test', lastName: 'User', name: 'Test User' }
            jest.spyOn(userController, 'createUser').mockReturnValue(Promise.resolve(mockUser))

            const response = await request(app)
                .post('/users')
                .send({ email: 'test@example.com', firstName: 'Test', lastName: 'User', name: 'Test User' })

            expect(response.status).toBe(200)
            expect(response.body).toEqual(mockUser)
            expect(userController.createUser).toHaveBeenCalledWith({
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User',
                name: 'Test User',
            })
        })
    })

    describe('PUT /users/:email', () => {
        it('should update a user by email', async () => {
            const mockUpdatedUser = { email: 'test@example.com', name: 'Updated User', firstName: 'Updated', lastName: 'User' }
            jest.spyOn(userController, 'updateUser').mockReturnValue(Promise.resolve(mockUpdatedUser))

            const response = await request(app)
                .put('/users/test@example.com')
                .send({ name: 'Updated User' })

            expect(response.status).toBe(200)
            expect(response.body).toEqual(mockUpdatedUser)
            expect(userController.updateUser).toHaveBeenCalledWith('test@example.com', {
                name: 'Updated User',
            })
        })
    })

    describe('DELETE /users/:email', () => {
        it('should delete a user by email', async () => {
            jest.spyOn(userController, 'deleteUser').mockImplementation()

            const response = await request(app).delete('/users/test@example.com')

            expect(response.status).toBe(200)
            expect(response.text).toBe('ok')
            expect(userController.deleteUser).toHaveBeenCalledWith('test@example.com')
        })
    })
})