# Security Implementation Guide

## Overview

This document describes the production-grade security implementation for the portfolio API. The following vulnerabilities have been addressed:

1. **Rate Limiting** - Protection against brute-force and DDoS attacks
2. **Authentication & Authorization** - JWT-based auth with RBAC
3. **CORS Configuration** - Strict origin validation

---

## 1. Rate Limiting

### Problem (Before)
```
❌ No request limits
❌ Vulnerable to brute-force attacks
❌ No protection against API abuse
❌ Potential for infrastructure cost attacks
```

### Solution (After)
```
✅ IP-based and user-based rate limiting
✅ Configurable limits via environment variables
✅ 429 Too Many Requests with proper headers
✅ Different limits for different endpoints
```

### Configuration

| Endpoint Type | Window | Max Requests | Purpose |
|--------------|--------|--------------|---------|
| Global | 1 min | 100 | General API protection |
| Auth | 15 min | 5 | Brute-force prevention |
| Contact | 1 hour | 3 | Spam prevention |

### Response Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705401600
Retry-After: 45
```

### Environment Variables

```bash
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_AUTH_WINDOW_MS=900000
RATE_LIMIT_AUTH_MAX_REQUESTS=5
RATE_LIMIT_CONTACT_WINDOW_MS=3600000
RATE_LIMIT_CONTACT_MAX_REQUESTS=3
```

---

## 2. Authentication & Authorization

### Problem (Before)
```
❌ No authentication required
❌ All routes publicly accessible
❌ No user identity verification
❌ No role-based access control
```

### Solution (After)
```
✅ JWT-based token authentication
✅ Access + Refresh token pattern
✅ Role-based access control (RBAC)
✅ Secure password hashing (bcrypt)
✅ Secrets via environment variables only
```

### Token Flow

```
1. Client sends credentials → POST /api/auth/login
2. Server validates and returns tokens
3. Client includes token → Authorization: Bearer <token>
4. Server validates on every request
5. Client refreshes token → POST /api/auth/refresh
```

### User Roles

```typescript
enum UserRole {
  GUEST = 'guest',      // Level 0 - Public access
  USER = 'user',        // Level 1 - Authenticated user
  ADMIN = 'admin',      // Level 2 - Administrative access
  SUPER_ADMIN = 'super_admin', // Level 3 - Full system access
}
```

### Response Codes

| Code | Meaning | When |
|------|---------|------|
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Valid token but insufficient permissions |

### Environment Variables

```bash
JWT_SECRET=your-super-secret-key-minimum-32-chars
JWT_ISSUER=portfolio-api
JWT_AUDIENCE=portfolio-client
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
```

---

## 3. CORS Configuration

### Problem (Before)
```
❌ Accepts requests from any origin (*)
❌ Allows credential leakage
❌ Vulnerable to CSRF attacks
❌ Data exfiltration possible
```

### Solution (After)
```
✅ Explicit origin whitelist
✅ No wildcard for authenticated routes
✅ Environment-specific origins
✅ Proper credentials handling
✅ Comprehensive header configuration
```

### Headers Set

```http
Access-Control-Allow-Origin: https://yourdomain.com
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: X-RateLimit-Limit, X-RateLimit-Remaining
Access-Control-Max-Age: 86400
```

### Environment Variables

```bash
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://staging.yourdomain.com
CORS_CREDENTIALS=true
CORS_MAX_AGE=86400
```

---

## API Endpoints

### Public Endpoints

| Method | Endpoint | Rate Limit | Description |
|--------|----------|------------|-------------|
| GET | `/api/health` | Global | Health check |
| POST | `/api/auth/login` | Auth | User login |
| POST | `/api/auth/refresh` | Auth | Token refresh |
| POST | `/api/contact` | Contact | Contact form |

### Protected Endpoints

| Method | Endpoint | Required Role | Description |
|--------|----------|---------------|-------------|
| GET | `/api/user/profile` | USER | Get user profile |
| GET | `/api/admin/dashboard` | ADMIN | Admin dashboard |

---

## Usage Examples

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin@123"}'
```

### Access Protected Route
```bash
curl http://localhost:3000/api/user/profile \
  -H "Authorization: Bearer <access_token>"
```

### Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<refresh_token>"}'
```

---

## Security Middleware Usage

```typescript
import { 
  withSecurity, 
  publicRoute, 
  protectedRoute, 
  adminRoute 
} from '@/lib/security';

// Public route with rate limiting
export const GET = publicRoute(handler);

// Protected route (requires authentication)
export const GET = protectedRoute(handler, UserRole.USER);

// Admin-only route
export const GET = adminRoute(handler);

// Custom configuration
export const GET = withSecurity(handler, {
  public: false,
  requiredRole: UserRole.ADMIN,
  rateLimitType: 'global',
});
```

---

## Production Checklist

- [ ] Generate strong JWT_SECRET (min 32 chars): `openssl rand -base64 32`
- [ ] Set CORS_ALLOWED_ORIGINS to production domains only
- [ ] Remove development origins from allowed list
- [ ] Use HTTPS for all production traffic
- [ ] Consider Redis for distributed rate limiting
- [ ] Set up log monitoring for security events
- [ ] Enable database for user storage (replace mock store)
- [ ] Add request logging middleware
- [ ] Set up error alerting for 401/403 patterns

---

## How Each Fix Prevents Real-World Attacks

### Rate Limiting Prevents:
- **Brute-force attacks**: Limits login attempts to 5 per 15 minutes
- **DDoS attacks**: Caps requests per IP per minute
- **API abuse**: Prevents scraping and automated attacks
- **Cost attacks**: Limits expensive operations

### Authentication Prevents:
- **Unauthorized access**: Every protected route validates tokens
- **Session hijacking**: Short token expiry (15 min)
- **Privilege escalation**: RBAC enforces role boundaries
- **Credential exposure**: Passwords never stored in plain text

### CORS Prevents:
- **Cross-site request forgery**: Only trusted origins allowed
- **Data theft**: Malicious sites can't access API responses
- **Cookie theft**: Credentials only sent to whitelisted origins
- **Clickjacking**: X-Frame-Options: DENY header set
