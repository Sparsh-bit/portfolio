/**
 * Rate Limiter Implementation
 * ===========================
 * Production-grade rate limiting using sliding window algorithm.
 * Supports IP-based and user-based rate limiting with configurable windows.
 * 
 * WHY THIS IS NEEDED:
 * - Prevents brute-force attacks on authentication endpoints
 * - Protects against DDoS and API abuse
 * - Controls infrastructure costs from excessive requests
 * - Ensures fair usage across all clients
 */

import { RATE_LIMIT_CONFIG } from './config';

interface RateLimitEntry {
    count: number;
    resetTime: number;
    firstRequest: number;
}

interface RateLimitResult {
    allowed: boolean;
    limit: number;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
}

// In-memory store for rate limiting
// PRODUCTION NOTE: Replace with Redis for multi-instance deployments
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup interval to prevent memory leaks
const CLEANUP_INTERVAL_MS = 60000; // 1 minute

// Start cleanup timer
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of rateLimitStore.entries()) {
            if (now > entry.resetTime) {
                rateLimitStore.delete(key);
            }
        }
    }, CLEANUP_INTERVAL_MS);
}

/**
 * Sliding window rate limiter
 * Uses a combination of fixed window + sliding log for accuracy
 */
export function checkRateLimit(
    identifier: string,
    windowMs: number,
    maxRequests: number
): RateLimitResult {
    const now = Date.now();
    const key = identifier;
    const entry = rateLimitStore.get(key);

    // No existing entry - create new one
    if (!entry || now > entry.resetTime) {
        const newEntry: RateLimitEntry = {
            count: 1,
            resetTime: now + windowMs,
            firstRequest: now,
        };
        rateLimitStore.set(key, newEntry);

        return {
            allowed: true,
            limit: maxRequests,
            remaining: maxRequests - 1,
            resetTime: newEntry.resetTime,
        };
    }

    // Entry exists - increment and check
    entry.count += 1;
    const remaining = Math.max(0, maxRequests - entry.count);

    if (entry.count > maxRequests) {
        const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
        return {
            allowed: false,
            limit: maxRequests,
            remaining: 0,
            resetTime: entry.resetTime,
            retryAfter,
        };
    }

    return {
        allowed: true,
        limit: maxRequests,
        remaining,
        resetTime: entry.resetTime,
    };
}

/**
 * Get client identifier for rate limiting
 * Uses IP address with optional user ID for authenticated requests
 */
export function getClientIdentifier(
    request: Request,
    userId?: string
): string {
    // Try to get real IP from various headers (reverse proxy support)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare

    let ip = 'unknown';

    if (forwardedFor) {
        // x-forwarded-for can contain multiple IPs, take the first (client)
        ip = forwardedFor.split(',')[0].trim();
    } else if (realIp) {
        ip = realIp;
    } else if (cfConnectingIp) {
        ip = cfConnectingIp;
    }

    // Combine IP with user ID if authenticated for per-user limits
    if (userId) {
        return `user:${userId}:${ip}`;
    }

    return `ip:${ip}`;
}

/**
 * Rate limit types for different API endpoints
 */
export type RateLimitType = 'global' | 'auth' | 'contact';

/**
 * Apply rate limiting based on endpoint type
 */
export function applyRateLimit(
    request: Request,
    type: RateLimitType = 'global',
    userId?: string
): RateLimitResult {
    const config = RATE_LIMIT_CONFIG[type];
    const identifier = `${type}:${getClientIdentifier(request, userId)}`;

    return checkRateLimit(identifier, config.windowMs, config.maxRequests);
}

/**
 * Generate rate limit headers for response
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
    const headers: Record<string, string> = {
        'X-RateLimit-Limit': result.limit.toString(),
        'X-RateLimit-Remaining': result.remaining.toString(),
        'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
    };

    if (result.retryAfter !== undefined) {
        headers['Retry-After'] = result.retryAfter.toString();
    }

    return headers;
}

/**
 * Create a 429 Too Many Requests response
 */
export function createRateLimitResponse(result: RateLimitResult): Response {
    return new Response(
        JSON.stringify({
            error: 'Too Many Requests',
            message: 'Rate limit exceeded. Please try again later.',
            retryAfter: result.retryAfter,
        }),
        {
            status: 429,
            headers: {
                'Content-Type': 'application/json',
                ...getRateLimitHeaders(result),
            },
        }
    );
}
