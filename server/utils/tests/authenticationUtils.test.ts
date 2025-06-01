import { getToken, refreshAccessToken } from '../authenticationUtils';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

jest.mock('jsonwebtoken');

describe('authenticationUtils', () => {
    const mockJwtKey = 'mockJwtKey';
    const mockUser = { id: 1, name: 'Test User' };
    const mockToken = 'mockToken';
    const mockEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...mockEnv, JWT_KEY: mockJwtKey };
    });

    afterEach(() => {
        process.env = mockEnv;
    });

    describe('getToken', () => {
        it('should generate a token for the given user', () => {
            (jwt.sign as jest.Mock).mockReturnValue(mockToken);

            const token = getToken(mockUser);

            expect(token).toBe(mockToken);
        });
    });

    describe('refreshAccessToken', () => {
        let req: Partial<Request>;
        let res: Partial<Response>;
        let next: NextFunction;

        beforeEach(() => {
            req = {
                cookies: { accessToken: mockToken },
                user: mockUser,
            };
            res = {
                cookie: jest.fn(),
            };
            next = jest.fn();
        });

        it('should generate a new token and set it in the cookie', () => {
            (jwt.sign as jest.Mock).mockReturnValue(mockToken);

            refreshAccessToken(req as Request, res as Response, next);

            expect(res.cookie).toHaveBeenCalledWith('accessToken', mockToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
            expect(next).toHaveBeenCalled();
        });

        it('should call next if no token is present in cookies', () => {
            req.cookies = undefined;

            refreshAccessToken(req as Request, res as Response, next);

            expect(res.cookie).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalled();
        });

        it('should call next with an error if user information is missing', () => {
            req.user = undefined;

            refreshAccessToken(req as Request, res as Response, next);

            expect(res.cookie).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(new Error('User information is missing in the request'));
        });
    });
});