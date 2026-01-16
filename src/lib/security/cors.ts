/**
 * CORS (Cross-Origin Resource Sharing) Configuration
 * ===================================================
 * Production-grade CORS implementation with strict origin validation.
 * 
 * WHY THIS IS NEEDED:
 * - Prevents malicious websites from making requests to your API
 * - Protects against CSRF attacks when combined with proper token handling
 * - Controls which domains can access your resources
 * - Prevents data exfiltration through cross-origin requests
 * 
 * SECURITY PRINCIPLES:
 * - Never use wildcard (*) for authenticated routes
 * - Explicitly whitelist allowed origins
 * - Validate Origin header on every request
 * - Support credentials only for trusted origins
 */

import { CORS_CONFIG, SECURITY_HEADERS } from './config';

// =============================================================================
// TYPES
// =============================================================================

export interface CorsResult {
    allowed: boolean;
    headers: Record<string, string>;
    isPreflight: boolean;
}

// =============================================================================
// ORIGIN VALIDATION
// =============================================================================

/**
 * Check if an origin is allowed
 */
export function isOriginAllowed(origin: string | null): boolean {
    if (!origin) {
        // Requests without Origin header (same-origin, curl, etc.)
        // Allow these but don't set CORS headers
        return true;
    }

    // Check against whitelist
    return CORS_CONFIG.allowedOrigins.some(allowed => {
        // Support exact match
        if (allowed === origin) return true;

        // Support wildcard subdomain matching (e.g., *.example.com)
        if (allowed.startsWith('*.')) {
            const domain = allowed.slice(2);
            const originDomain = origin.replace(/^https?:\/\//, '').split(':')[0];
            return originDomain.endsWith(domain) || originDomain === domain.slice(1);
        }

        return false;
    });
}

/**
 * Get the appropriate Access-Control-Allow-Origin header value
 * NEVER returns '*' for authenticated routes
 */
export function getAllowedOrigin(origin: string | null, isAuthenticated = false): string | null {
    if (!origin) return null;

    if (!isOriginAllowed(origin)) {
        return null;
    }

    // For authenticated routes, always reflect the specific origin
    // Never use wildcard for routes that accept credentials
    if (isAuthenticated || CORS_CONFIG.credentials) {
        return origin;
    }

    return origin;
}

// =============================================================================
// CORS HEADERS
// =============================================================================

/**
 * Generate CORS headers for a request
 */
export function getCorsHeaders(
    request: Request,
    isAuthenticated = false
): Record<string, string> {
    const origin = request.headers.get('Origin');
    const headers: Record<string, string> = {};

    // Only set CORS headers if Origin is present and allowed
    const allowedOrigin = getAllowedOrigin(origin, isAuthenticated);

    if (allowedOrigin) {
        headers['Access-Control-Allow-Origin'] = allowedOrigin;

        if (CORS_CONFIG.credentials) {
            headers['Access-Control-Allow-Credentials'] = 'true';
        }

        // Expose rate limit headers to client
        headers['Access-Control-Expose-Headers'] = CORS_CONFIG.exposedHeaders.join(', ');

        // Vary header for proper caching
        headers['Vary'] = 'Origin';
    }

    return headers;
}

/**
 * Generate headers for preflight (OPTIONS) requests
 */
export function getPreflightHeaders(request: Request): Record<string, string> {
    const origin = request.headers.get('Origin');
    const headers: Record<string, string> = {};

    const allowedOrigin = getAllowedOrigin(origin);

    if (allowedOrigin) {
        headers['Access-Control-Allow-Origin'] = allowedOrigin;
        headers['Access-Control-Allow-Methods'] = CORS_CONFIG.allowedMethods.join(', ');
        headers['Access-Control-Allow-Headers'] = CORS_CONFIG.allowedHeaders.join(', ');
        headers['Access-Control-Max-Age'] = CORS_CONFIG.maxAge.toString();

        if (CORS_CONFIG.credentials) {
            headers['Access-Control-Allow-Credentials'] = 'true';
        }

        headers['Vary'] = 'Origin, Access-Control-Request-Method, Access-Control-Request-Headers';
    }

    return headers;
}

// =============================================================================
// CORS VALIDATION
// =============================================================================

/**
 * Validate CORS for a request and return appropriate headers/response
 */
export function validateCors(request: Request, isAuthenticated = false): CorsResult {
    const origin = request.headers.get('Origin');
    const isPreflight = request.method === 'OPTIONS';

    // Check if this is a preflight request
    if (isPreflight) {
        const headers = getPreflightHeaders(request);
        return {
            allowed: Object.keys(headers).length > 0,
            headers,
            isPreflight: true,
        };
    }

    // For actual requests, validate origin
    if (origin && !isOriginAllowed(origin)) {
        return {
            allowed: false,
            headers: {},
            isPreflight: false,
        };
    }

    return {
        allowed: true,
        headers: getCorsHeaders(request, isAuthenticated),
        isPreflight: false,
    };
}

// =============================================================================
// RESPONSE HELPERS
// =============================================================================

/**
 * Create a preflight response
 */
export function createPreflightResponse(request: Request): Response {
    const headers = getPreflightHeaders(request);

    if (Object.keys(headers).length === 0) {
        // Origin not allowed
        return new Response(null, {
            status: 403,
            statusText: 'Forbidden',
        });
    }

    return new Response(null, {
        status: 204, // No Content
        headers,
    });
}

/**
 * Create a CORS error response
 */
export function createCorsErrorResponse(): Response {
    return new Response(
        JSON.stringify({
            error: 'Forbidden',
            message: 'Origin not allowed by CORS policy',
        }),
        {
            status: 403,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}

/**
 * Add CORS and security headers to a response
 */
export function addCorsHeaders(
    response: Response,
    request: Request,
    isAuthenticated = false
): Response {
    const corsHeaders = getCorsHeaders(request, isAuthenticated);

    // Clone response to modify headers
    const newHeaders = new Headers(response.headers);

    // Add CORS headers
    for (const [key, value] of Object.entries(corsHeaders)) {
        newHeaders.set(key, value);
    }

    // Add security headers
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
        newHeaders.set(key, value);
    }

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
    });
}
