/**
 * Health Check API
 * ================
 * Public endpoint for health checks and monitoring.
 * Returns security configuration status (non-sensitive only).
 */

// Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { publicRoute, validateSecurityConfig, type SecurityContext } from '@/lib/security';

async function healthHandler(
    request: NextRequest,
    context: SecurityContext
) {
    const configStatus = validateSecurityConfig();

    return NextResponse.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        security: {
            rateLimitingEnabled: true,
            corsEnabled: true,
            authenticationEnabled: true,
            configValid: configStatus.valid,
            // Only show errors in development
            ...(process.env.NODE_ENV !== 'production' && {
                configErrors: configStatus.errors,
            }),
        },
        requestId: context.requestId,
    });
}

export const GET = publicRoute(healthHandler);

export async function OPTIONS(request: NextRequest) {
    return publicRoute(
        async () => new Response(null, { status: 204 })
    )(request);
}
