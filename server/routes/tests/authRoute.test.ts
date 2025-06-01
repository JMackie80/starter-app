import request from 'supertest'
import express from 'express'
import authRoute from '../authRoute'
import { Request, Response, NextFunction } from 'express'

interface MockRequest extends Request {
    user?: { id: string; email: string }
}

type MockAuthenticate = (
    strategy: string,
    options: Record<string, unknown>
) => (req: MockRequest, res: Response, next: NextFunction) => void

jest.mock('passport', () => ({
    authenticate: jest.fn(((strategy: string, options: Record<string, unknown>) => 
        (req: MockRequest, res: Response, next: NextFunction) => {
            if (strategy === 'google') {
                if (req.url.includes('/callback')) {
                    req.user = { id: '123', email: 'test@example.com' }
                    return next()
                }
                return res.redirect('/mock-google-auth')
            }
            next()
        }) as MockAuthenticate),
}))

jest.mock('../../utils/authenticationUtils', () => ({
    getToken: jest.fn(() => 'mockToken'),
}))

jest.mock('../../utils/environmentVariableUtils', () => ({
    getEnvironmentVariable: jest.fn((key) => {
        if (key === 'CLIENT_URL') return 'http://localhost:3000'
        return ''
    }),
}))

const app = express()
app.use(express.json())
app.use(authRoute)

describe('authRoute', () => {
    it('should redirect to Google authentication on /google', async () => {
        const response = await request(app).get('/google')
        expect(response.status).toBe(302)
        expect(response.header.location).toBe('/mock-google-auth')
    })

    it('should handle Google callback and set token cookie', async () => {
        const response = await request(app).get('/google/callback')
        expect(response.status).toBe(302)
        expect(response.header['set-cookie'][0]).toContain('accessToken=mockToken')
        expect(response.header.location).toBe('http://localhost:3000/oauth?token=mockToken')
    })
})