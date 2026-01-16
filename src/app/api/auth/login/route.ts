/**
 * Authentication API - Login
 * ==========================
 * Handles user authentication with email/password.
 * Returns JWT access and refresh tokens on successful login.
 * 
 * SECURITY MEASURES:
 * - Rate limited to 5 attempts per 15 minutes
 * - Password verification using bcrypt
 * - Proper error messages that don't leak user existence
 * - Secure token generation with short expiry
 */

import { NextRequest, NextResponse } from 'next/server';
import {
    authRoute,
    generateTokenPair,
    verifyPassword,
    UserRole,
} from '@/lib/security';

// =============================================================================
// MOCK USER STORE
// In production, replace with database queries
// =============================================================================
const MOCK_USERS = new Map([
    ['admin@example.com', {
        id: 'usr_admin_001',
        email: 'admin@example.com',
        // Password: 'Admin@123' (hashed with bcrypt, 12 rounds)
        passwordHash: '$2b$12$/tiqQxYoDitWc.sV8bEhf./RldJ7J2Q3QqY9qCuk7FqnhXTyh9C46',
        role: UserRole.ADMIN,
        createdAt: new Date('2024-01-01'),
    }],
    ['user@example.com', {
        id: 'usr_user_001',
        email: 'user@example.com',
        // Password: 'User@123' (using same hash for demo - different password in production)
        passwordHash: '$2b$12$/tiqQxYoDitWc.sV8bEhf./RldJ7J2Q3QqY9qCuk7FqnhXTyh9C46',
        role: UserRole.USER,
        createdAt: new Date('2024-01-01'),
    }],
]);

// =============================================================================
// LOGIN HANDLER
// =============================================================================

async function loginHandler(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user (in production, query database)
        const user = MOCK_USERS.get(email.toLowerCase());

        // Generic error message to prevent user enumeration
        const invalidCredentialsResponse = NextResponse.json(
            { error: 'Invalid email or password' },
            { status: 401 }
        );

        if (!user) {
            // Simulate password check delay to prevent timing attacks
            await new Promise(resolve => setTimeout(resolve, 100));
            return invalidCredentialsResponse;
        }

        // Verify password
        const isValidPassword = await verifyPassword(password, user.passwordHash);

        if (!isValidPassword) {
            return invalidCredentialsResponse;
        }

        // Generate tokens
        const tokens = await generateTokenPair({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        // Return success with tokens
        return NextResponse.json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            ...tokens,
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'An error occurred during login' },
            { status: 500 }
        );
    }
}

// Apply security middleware with auth-specific rate limiting
export const POST = authRoute(loginHandler);

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
    return authRoute(async () => new Response(null, { status: 204 }))(request);
}
