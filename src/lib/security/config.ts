/**
 * Security Configuration
 * ======================
 * Centralized security configuration loaded from environment variables.
 * All secrets MUST be provided via environment variables - never hardcoded.
 */

// =============================================================================
// RATE LIMITING CONFIGURATION
// =============================================================================
export const RATE_LIMIT_CONFIG = {
  // Global API rate limiting
  global: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10), // 1 minute
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10), // 100 requests per window
  },
  // Authentication endpoints (stricter to prevent brute force)
  auth: {
    windowMs: parseInt(process.env.RATE_LIMIT_AUTH_WINDOW_MS || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_AUTH_MAX_REQUESTS || '5', 10), // 5 attempts
  },
  // Contact form (prevent spam)
  contact: {
    windowMs: parseInt(process.env.RATE_LIMIT_CONTACT_WINDOW_MS || '3600000', 10), // 1 hour
    maxRequests: parseInt(process.env.RATE_LIMIT_CONTACT_MAX_REQUESTS || '3', 10), // 3 submissions
  },
} as const;

// =============================================================================
// JWT CONFIGURATION
// =============================================================================
export const JWT_CONFIG = {
  // CRITICAL: This MUST be set via environment variable in production
  secret: process.env.JWT_SECRET || '',
  issuer: process.env.JWT_ISSUER || 'portfolio-api',
  audience: process.env.JWT_AUDIENCE || 'portfolio-client',
  accessTokenExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
  refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
  algorithm: 'HS256' as const,
} as const;

// =============================================================================
// CORS CONFIGURATION
// =============================================================================
const parseOrigins = (envVar: string | undefined, defaults: string[]): string[] => {
  if (!envVar) return defaults;
  return envVar.split(',').map(origin => origin.trim()).filter(Boolean);
};

export const CORS_CONFIG = {
  // Allowed origins for each environment
  allowedOrigins: parseOrigins(process.env.CORS_ALLOWED_ORIGINS, [
    // Development
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]),
  
  // Allowed HTTP methods
  allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] as const,
  
  // Allowed headers
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'X-CSRF-Token',
  ] as const,
  
  // Exposed headers (visible to client)
  exposedHeaders: [
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
    'X-RateLimit-Reset',
    'X-Request-Id',
  ] as const,
  
  // Allow credentials (cookies, authorization headers)
  credentials: process.env.CORS_CREDENTIALS !== 'false',
  
  // Preflight cache duration (seconds)
  maxAge: parseInt(process.env.CORS_MAX_AGE || '86400', 10), // 24 hours
} as const;

// =============================================================================
// USER ROLES
// =============================================================================
export enum UserRole {
  GUEST = 'guest',
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

// Route protection levels
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.GUEST]: 0,
  [UserRole.USER]: 1,
  [UserRole.ADMIN]: 2,
  [UserRole.SUPER_ADMIN]: 3,
};

// =============================================================================
// SECURITY HEADERS
// =============================================================================
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
} as const;

// =============================================================================
// VALIDATION HELPERS
// =============================================================================
export function validateSecurityConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check JWT secret in production
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.JWT_SECRET) {
      errors.push('JWT_SECRET environment variable is required in production');
    } else if (process.env.JWT_SECRET.length < 32) {
      errors.push('JWT_SECRET must be at least 32 characters long');
    }
    
    if (!process.env.CORS_ALLOWED_ORIGINS) {
      errors.push('CORS_ALLOWED_ORIGINS must be explicitly set in production');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}
