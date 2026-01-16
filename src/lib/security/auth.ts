/**
 * Authentication & Authorization (Edge Runtime Compatible)
 * =========================================================
 * Production-grade JWT-based authentication with role-based access control.
 * Uses the 'jose' library for secure JWT operations (Edge Runtime compatible).
 * Uses Web Crypto API for password hashing (Edge Runtime compatible).
 * 
 * WHY THIS IS NEEDED:
 * - Prevents unauthorized access to protected resources
 * - Ensures data privacy and user isolation
 * - Enables audit trails and accountability
 * - Supports fine-grained access control
 */

import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { JWT_CONFIG, UserRole, ROLE_HIERARCHY } from './config';

// =============================================================================
// TYPES
// =============================================================================

export interface TokenPayload extends JWTPayload {
    sub: string;        // User ID
    email: string;      // User email
    role: UserRole;     // User role
    type: 'access' | 'refresh';
}

export interface AuthResult {
    authenticated: boolean;
    user?: {
        id: string;
        email: string;
        role: UserRole;
    };
    error?: string;
}

export interface User {
    id: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    createdAt: Date;
    lastLogin?: Date;
}

// =============================================================================
// JWT SECRET HANDLING
// =============================================================================

let cachedSecret: Uint8Array | null = null;

function getJwtSecret(): Uint8Array {
    if (cachedSecret) return cachedSecret;

    const secret = JWT_CONFIG.secret;

    if (!secret) {
        // In development, use a placeholder (warn about it)
        if (process.env.NODE_ENV !== 'production') {
            console.warn('⚠️  JWT_SECRET not set. Using development placeholder. DO NOT USE IN PRODUCTION!');
            cachedSecret = new TextEncoder().encode('dev-secret-do-not-use-in-production-min-32-chars');
            return cachedSecret;
        }
        throw new Error('JWT_SECRET environment variable is required');
    }

    if (secret.length < 32) {
        throw new Error('JWT_SECRET must be at least 32 characters');
    }

    cachedSecret = new TextEncoder().encode(secret);
    return cachedSecret;
}

// =============================================================================
// TOKEN GENERATION
// =============================================================================

/**
 * Generate an access token for a user
 */
export async function generateAccessToken(user: {
    id: string;
    email: string;
    role: UserRole;
}): Promise<string> {
    const secret = getJwtSecret();

    const token = await new SignJWT({
        email: user.email,
        role: user.role,
        type: 'access',
    })
        .setProtectedHeader({ alg: JWT_CONFIG.algorithm })
        .setSubject(user.id)
        .setIssuedAt()
        .setIssuer(JWT_CONFIG.issuer)
        .setAudience(JWT_CONFIG.audience)
        .setExpirationTime(JWT_CONFIG.accessTokenExpiry)
        .sign(secret);

    return token;
}

/**
 * Generate a refresh token for a user
 */
export async function generateRefreshToken(user: {
    id: string;
    email: string;
    role: UserRole;
}): Promise<string> {
    const secret = getJwtSecret();

    const token = await new SignJWT({
        email: user.email,
        role: user.role,
        type: 'refresh',
    })
        .setProtectedHeader({ alg: JWT_CONFIG.algorithm })
        .setSubject(user.id)
        .setIssuedAt()
        .setIssuer(JWT_CONFIG.issuer)
        .setAudience(JWT_CONFIG.audience)
        .setExpirationTime(JWT_CONFIG.refreshTokenExpiry)
        .sign(secret);

    return token;
}

/**
 * Generate both access and refresh tokens
 */
export async function generateTokenPair(user: {
    id: string;
    email: string;
    role: UserRole;
}): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
        generateAccessToken(user),
        generateRefreshToken(user),
    ]);

    return { accessToken, refreshToken };
}

// =============================================================================
// TOKEN VERIFICATION
// =============================================================================

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
    try {
        const secret = getJwtSecret();

        const { payload } = await jwtVerify(token, secret, {
            issuer: JWT_CONFIG.issuer,
            audience: JWT_CONFIG.audience,
        });

        return payload as TokenPayload;
    } catch {
        // Token is invalid, expired, or tampered with
        return null;
    }
}

/**
 * Extract and verify token from Authorization header
 */
export async function authenticateRequest(request: Request): Promise<AuthResult> {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
        return {
            authenticated: false,
            error: 'No authorization header provided',
        };
    }

    // Expect "Bearer <token>" format
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
        return {
            authenticated: false,
            error: 'Invalid authorization header format. Expected: Bearer <token>',
        };
    }

    const token = parts[1];
    const payload = await verifyToken(token);

    if (!payload) {
        return {
            authenticated: false,
            error: 'Invalid or expired token',
        };
    }

    // Check if this is an access token (not refresh)
    if (payload.type !== 'access') {
        return {
            authenticated: false,
            error: 'Invalid token type',
        };
    }

    return {
        authenticated: true,
        user: {
            id: payload.sub!,
            email: payload.email,
            role: payload.role,
        },
    };
}

// =============================================================================
// AUTHORIZATION (RBAC)
// =============================================================================

/**
 * Check if a user has the minimum required role
 */
export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
    return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Check if a user has any of the specified roles
 */
export function hasAnyRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
    return allowedRoles.some(role => ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[role]);
}

/**
 * Authorization guard - checks if user has required role
 */
export function authorizeRole(
    authResult: AuthResult,
    requiredRole: UserRole
): { authorized: boolean; error?: string } {
    if (!authResult.authenticated || !authResult.user) {
        return {
            authorized: false,
            error: 'Not authenticated',
        };
    }

    if (!hasRole(authResult.user.role, requiredRole)) {
        return {
            authorized: false,
            error: `Insufficient permissions. Required role: ${requiredRole}`,
        };
    }

    return { authorized: true };
}

// =============================================================================
// RESPONSE HELPERS
// =============================================================================

/**
 * Create a 401 Unauthorized response
 */
export function createUnauthorizedResponse(message = 'Authentication required'): Response {
    return new Response(
        JSON.stringify({
            error: 'Unauthorized',
            message,
        }),
        {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
                'WWW-Authenticate': 'Bearer',
            },
        }
    );
}

/**
 * Create a 403 Forbidden response
 */
export function createForbiddenResponse(message = 'Access denied'): Response {
    return new Response(
        JSON.stringify({
            error: 'Forbidden',
            message,
        }),
        {
            status: 403,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}

// =============================================================================
// PASSWORD HASHING (Edge Runtime Compatible using Web Crypto API)
// =============================================================================

const ITERATIONS = 100000;
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

/**
 * Hash a password securely using PBKDF2 (Web Crypto API - Edge compatible)
 */
export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));

    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        'PBKDF2',
        false,
        ['deriveBits']
    );

    const derivedBits = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: ITERATIONS,
            hash: 'SHA-256',
        },
        keyMaterial,
        KEY_LENGTH * 8
    );

    const hashArray = new Uint8Array(derivedBits);
    const saltBase64 = btoa(String.fromCharCode(...salt));
    const hashBase64 = btoa(String.fromCharCode(...hashArray));

    return `pbkdf2:${ITERATIONS}:${saltBase64}:${hashBase64}`;
}

/**
 * Verify a password against a hash using PBKDF2 (Web Crypto API - Edge compatible)
 */
export async function verifyPassword(
    password: string,
    storedHash: string
): Promise<boolean> {
    try {
        const parts = storedHash.split(':');

        // Support legacy bcrypt hashes by always returning false
        // In production, you'd migrate users to new hash format
        if (parts[0] !== 'pbkdf2' || parts.length !== 4) {
            // Check for demo/development passwords
            if (storedHash.startsWith('demo:')) {
                return password === storedHash.substring(5);
            }
            return false;
        }

        const iterations = parseInt(parts[1], 10);
        const salt = Uint8Array.from(atob(parts[2]), c => c.charCodeAt(0));
        const storedHashBytes = Uint8Array.from(atob(parts[3]), c => c.charCodeAt(0));

        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            'PBKDF2',
            false,
            ['deriveBits']
        );

        const derivedBits = await crypto.subtle.deriveBits(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: iterations,
                hash: 'SHA-256',
            },
            keyMaterial,
            storedHashBytes.length * 8
        );

        const derivedHashBytes = new Uint8Array(derivedBits);

        // Constant-time comparison to prevent timing attacks
        if (derivedHashBytes.length !== storedHashBytes.length) {
            return false;
        }

        let result = 0;
        for (let i = 0; i < derivedHashBytes.length; i++) {
            result |= derivedHashBytes[i] ^ storedHashBytes[i];
        }

        return result === 0;
    } catch {
        return false;
    }
}
