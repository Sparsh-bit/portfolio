/**
 * Admin Dashboard API
 * ===================
 * Admin-only endpoint for accessing dashboard data.
 * Demonstrates role-based access control.
 * 
 * SECURITY MEASURES:
 * - Requires valid JWT access token
 * - Requires ADMIN role or higher
 * - Rate limited
 */

// Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { adminRoute, type SecurityContext } from '@/lib/security';

async function getDashboardHandler(
    request: NextRequest,
    context: SecurityContext
) {
    const { user, requestId, rateLimitRemaining } = context;

    // Return admin dashboard data
    return NextResponse.json({
        message: 'Welcome to the Admin Dashboard',
        admin: {
            id: user!.id,
            email: user!.email,
            role: user!.role,
        },
        stats: {
            totalUsers: 156,
            activeUsers: 42,
            totalProjects: 23,
            recentContacts: 7,
        },
        requestId,
        rateLimitRemaining,
    });
}

// Admin-only route
export const GET = adminRoute(getDashboardHandler);

export async function OPTIONS(request: NextRequest) {
    return adminRoute(
        async () => new Response(null, { status: 204 })
    )(request);
}
