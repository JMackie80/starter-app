import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import { setupPassport } from '../passport'
import { getUser } from '../../controllers/userController'

jest.mock('passport')
jest.mock('passport-google-oauth20', () => ({
    Strategy: jest.fn()
}))
jest.mock('passport-jwt', () => ({
    Strategy: jest.fn(),
    ExtractJwt: {
        fromExtractors: jest.fn(() => jest.fn())
    }
}))
jest.mock('../../controllers/userController', () => ({
    getUser: jest.fn(),
    createUser: jest.fn()
}))
jest.mock('../../utils/environmentVariableUtils', () => ({
    getEnvironmentVariable: jest.fn((key: 'GOOGLE_CLIENT_ID' | 'GOOGLE_CLIENT_SECRET' | 'JWT_KEY') => {
        const env = {
            GOOGLE_CLIENT_ID: 'test-client-id',
            GOOGLE_CLIENT_SECRET: 'test-client-secret',
            JWT_KEY: 'test-jwt-key'
        }
        return env[key]
    })
}))

describe('Passport Middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('setupPassport', () => {
        it('should configure GoogleStrategy', () => {
            setupPassport()

            expect(GoogleStrategy).toHaveBeenCalledWith(
                {
                    clientID: 'test-client-id',
                    clientSecret: 'test-client-secret',
                    callbackURL: 'http://localhost:3001/auth/google/callback'
                },
                expect.any(Function)
            )
        })

        it('should serialize and deserialize user', async () => {
            const serializeUserMock = jest.fn()
            const deserializeUserMock = jest.fn()
            passport.serializeUser = serializeUserMock
            passport.deserializeUser = deserializeUserMock

            setupPassport()

            expect(serializeUserMock).toHaveBeenCalledWith(expect.any(Function))
            expect(deserializeUserMock).toHaveBeenCalledWith(expect.any(Function))

            const user = { email: 'test@example.com' }
            const doneMock = jest.fn()
            serializeUserMock.mock.calls[0][0](user, doneMock)
            expect(doneMock).toHaveBeenCalledWith(null, user.email)

            ;(getUser as jest.Mock).mockResolvedValue(user)
            await deserializeUserMock.mock.calls[0][0]('test@example.com', doneMock)
            expect(doneMock).toHaveBeenCalledWith(null, user)
        })
    })
})