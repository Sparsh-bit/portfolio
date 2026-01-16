/**
 * Security Middleware
 * ===================
 * Unified middleware that combines rate limiting, authentication, authorization, and CORS.
 * Provides a clean API for protecting Next.js API routes.
 * 
 * USAGE:
 * ```typescript
 * import { withSecurity } from '@/lib/security/middleware';
 * 
 * // Public route with rate limiting
 * export const GET = withSecurity(handler, { public: true });
 * 
 * // Protected route requiring authentication
 * export const POST = withSecurity(handler, { requiredRole: UserRole.USER });
 * 
 * // Admin-only route
 * export const DELETE = withSecurity(handler, { requiredRole: UserRole.ADMIN });
 * ```
 */

import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { UserRole, SECURITY_HEADERS, validateSecurityConfig } from './config';
import {
    applyRateLimit,
    getRateLimitHeaders,
    createRateLimitResponse,
    RateLimitType,
} from './rate-limiter';
import {
    authenticateRequest,
    authorizeRole,
    createUnauthorizedResponse,
    createForbiddenResponse,
    AuthResult,
} from './auth';
import {
    validateCors,
    createPreflightResponse,
    createCorsErrorResponse,
    addCorsHeaders,
} from './cors';

// =============================================================================
// TYPES
// =============================================================================

export interface SecurityOptions {
    /**
     * If true, route is publicly accessible (no authentication required)
     * Rate limiting and CORS still apply
     */
    public?: boolean;

    /**
     * Minimum role required to access this route
     * Ignored if `public` is true
     */
    requiredRole?: UserRole;

    /**
     * Rate limit type to apply
     * @default 'global'
     */
    rateLimitType?: RateLimitType;

    /**
     * Skip rate limiting for this route
     * USE WITH CAUTION - only for internal routes
     */
    skipRateLimit?: boolean;

    /**
     * Skip CORS validation (for internal routes only)
     */
    skipCors?: boolean;
}

export interface SecurityContext {
    requestId: string;
    user: AuthResult['user'];
    rateLimitRemaining: number;
}

export type SecureHandler = (
    request: NextRequest,
    context: SecurityContext
) => Promise<Response> | Response;

// =============================================================================
// SECURITY MIDDLEWARE
// =============================================================================

/**
 * Main security wrapper for API routes
 * Applies all security measures in the correct order:
 * 1. Request ID generation
 * 2. CORS validation
 * 3. Rate limiting
 * 4. Authentication
 * 5. Authorization
 */
export function withSecurity(
    handler: SecureHandler,
    options: SecurityOptions = {}
) {
    const {
        public: isPublic = false,
        requiredRole,
        rateLimitType = 'global',
        skipRateLimit = false,
        skipCors = false,
    } = options;

    // Validate security config on startup (development only)
    if (process.env.NODE_ENV === 'development') {
        const configValidation = validateSecurityConfig();
        if (!configValidation.valid) {
            console.warn('⚠️  Security configuration warnings:', configValidation.errors);
        }
    }

    return async (request: NextRequest): Promise<Response> => {
        // Generate unique request ID for tracing
        const requestId = uuidv4();

        // =========================================================================
        // STEP 1: CORS VALIDATION
        // =========================================================================
        if (!skipCors) {
            // Handle preflight requests
            if (request.method === 'OPTIONS') {
                return createPreflightResponse(request);
            }

            const corsResult = validateCors(request, !isPublic);

            if (!corsResult.allowed) {
                return createCorsErrorResponse();
            }
        }

        // =========================================================================
        // STEP 2: RATE LIMITING
        // =========================================================================
        let rateLimitRemaining = Infinity;

        if (!skipRateLimit) {
            const rateLimitResult = applyRateLimit(request, rateLimitType);
            rateLimitRemaining = rateLimitResult.remaining;

            if (!rateLimitResult.allowed) {
                const response = createRateLimitResponse(rateLimitResult);
                return addCorsHeaders(response, request, !isPublic);
            }
        }

        // =========================================================================
        // STEP 3: AUTHENTICATION
        // =========================================================================
        let authResult: AuthResult = { authenticated: false };

        if (!isPublic) {
            authResult = await authenticateRequest(request);

            if (!authResult.authenticated) {
                const response = createUnauthorizedResponse(authResult.error);
                return addCorsHeaders(response, request, false);
            }

            // =====================================================================
            // STEP 4: AUTHORIZATION (RBAC)
            // =====================================================================
            if (requiredRole) {
                const authzResult = authorizeRole(authResult, requiredRole);

                if (!authzResult.authorized) {
                    const response = createForbiddenResponse(authzResult.error);
                    return addCorsHeaders(response, request, true);
                }
            }
        }

        // =========================================================================
        // STEP 5: EXECUTE HANDLER
        // =========================================================================
        try {
            const context: SecurityContext = {
                requestId,
                user: authResult.user,
                rateLimitRemaining,
            };

            let response = await handler(request, context);

            // Add security headers
            const newHeaders = new Headers(response.headers);
            newHeaders.set('X-Request-Id', requestId);

            for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
                newHeaders.set(key, value);
            }

            // Add rate limit headers
            if (!skipRateLimit) {
                const rateLimitResult = applyRateLimit(request, rateLimitType);
                const rateLimitHeaders = getRateLimitHeaders(rateLimitResult);
                for (const [key, value] of Object.entries(rateLimitHeaders)) {
                    newHeaders.set(key, value);
                }
            }

            response = new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: newHeaders,
            });

            // Add CORS headers
            if (!skipCors) {
                response = addCorsHeaders(response, request, authResult.authenticated);
            }

            return response;
        } catch (error) {
            console.error(`[${requestId}] Handler error:`, error);

            const response = NextResponse.json(
                {
                    error: 'Internal Server Error',
                    requestId,
                },
                { status: 500 }
            );

            if (!skipCors) {
                return addCorsHeaders(response, request, authResult.authenticated);
            }

            return response;
        }
    };
}

// =============================================================================
// CONVENIENCE WRAPPERS
// =============================================================================

/**
 * Public route - no authentication required, with rate limiting
 */
export function publicRoute(handler: SecureHandler, rateLimitType: RateLimitType = 'global') {
    return withSecurity(handler, { public: true, rateLimitType });
}

/**
 * Protected route - requires authentication
 */
export function protectedRoute(handler: SecureHandler, requiredRole: UserRole = UserRole.USER) {
    return withSecurity(handler, { requiredRole });
}

/**
 * Admin route - requires admin role
 */
export function adminRoute(handler: SecureHandler) {
    return withSecurity(handler, { requiredRole: UserRole.ADMIN });
}

/**
 * Auth route - public but with stricter rate limiting (for login/register)
 */
export function authRoute(handler: SecureHandler) {
    return withSecurity(handler, { public: true, rateLimitType: 'auth' });
}

// =============================================================================
// RE-EXPORTS
// =============================================================================
export { UserRole } from './config';
export type { AuthResult } from './auth';
