/**
 * Security Module - Main Export
 * =============================
 * Central export for all security functionality.
 */

// Configuration
export {
    RATE_LIMIT_CONFIG,
    JWT_CONFIG,
    CORS_CONFIG,
    UserRole,
    ROLE_HIERARCHY,
    SECURITY_HEADERS,
    validateSecurityConfig,
} from './config';

// Rate Limiting
export {
    checkRateLimit,
    getClientIdentifier,
    applyRateLimit,
    getRateLimitHeaders,
    createRateLimitResponse,
    type RateLimitType,
} from './rate-limiter';

// Authentication & Authorization
export {
    generateAccessToken,
    generateRefreshToken,
    generateTokenPair,
    verifyToken,
    authenticateRequest,
    hasRole,
    hasAnyRole,
    authorizeRole,
    createUnauthorizedResponse,
    createForbiddenResponse,
    hashPassword,
    verifyPassword,
    type TokenPayload,
    type AuthResult,
    type User,
} from './auth';

// CORS
export {
    isOriginAllowed,
    getAllowedOrigin,
    getCorsHeaders,
    getPreflightHeaders,
    validateCors,
    createPreflightResponse,
    createCorsErrorResponse,
    addCorsHeaders,
    type CorsResult,
} from './cors';

// Middleware
export {
    withSecurity,
    publicRoute,
    protectedRoute,
    adminRoute,
    authRoute,
    type SecurityOptions,
    type SecurityContext,
    type SecureHandler,
} from './middleware';
