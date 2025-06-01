import request from 'supertest';
import express, { Request, Response } from 'express';
import passport from 'passport';
import { isAuthenticated, isAdmin } from '../authorization';

const app = express();

// Mock middleware for testing
app.use(express.json());
app.use(passport.initialize());

// Mock routes for testing
app.get('/protected', isAuthenticated, (req: Request, res: Response) => {
    res.status(200).json({ message: 'Authenticated' });
});

app.get('/admin', isAdmin, (req: Request, res: Response) => {
    res.status(200).json({ message: 'Admin Access Granted' });
});

// Mock passport authentication
jest.mock('passport', () => ({
    initialize: jest.fn(() => (req: Request, res: Response, next: Function) => next()),
    authenticate: jest.fn((strategy, options) => (req: Request, res: Response, next: Function) => {
        if (req.headers.authorization === 'Bearer valid-token') {
            req.user = { email: 'test', firstName: 'test', lastName: 'test', isAdmin: true }; // Mock user
            return next();
        } else if (req.headers.authorization === 'Bearer non-admin-token') {
            req.user = { email: 'test', firstName: 'test', lastName: 'test', isAdmin: false }; // Mock non-admin user
            return next();
        }
        res.status(401).json({ message: 'Unauthorized' });
    }),
}));

describe('Authorization Middleware', () => {
    it('should allow access to authenticated users', async () => {
        const response = await request(app)
            .get('/protected')
            .set('Authorization', 'Bearer valid-token');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Authenticated');
    });

    it('should deny access to unauthenticated users', async () => {
        const response = await request(app).get('/protected');
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });

    it('should allow access to admin users', async () => {
        const response = await request(app)
            .get('/admin')
            .set('Authorization', 'Bearer valid-token');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Admin Access Granted');
    });

    it('should deny access to non-admin users', async () => {
        const response = await request(app)
            .get('/admin')
            .set('Authorization', 'Bearer non-admin-token');

        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Forbidden: Access is denied');
    });

    it('should deny access if no user data is found', async () => {
        const response = await request(app)
            .get('/protected')
            .set('Authorization', 'Bearer invalid-token');

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });
});