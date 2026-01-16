/**
 * User Profile API
 * ================
 * Protected endpoint for fetching user profile.
 * Demonstrates authentication requirement.
 * 
 * SECURITY MEASURES:
 * - Requires valid JWT access token
 * - User can only access their own profile
 * - Rate limited
 */

// Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { protectedRoute, type SecurityContext, UserRole } from '@/lib/security';

async function getProfileHandler(
    request: NextRequest,
    context: SecurityContext
) {
    // User is guaranteed to be authenticated here
    const { user, requestId } = context;

    if (!user) {
        return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
        );
    }

    // Return user profile
    return NextResponse.json({
        id: user.id,
        email: user.email,
        role: user.role,
        requestId,
    });
}

// Protected route - requires authentication
export const GET = protectedRoute(getProfileHandler, UserRole.USER);

export async function OPTIONS(request: NextRequest) {
    return protectedRoute(
        async () => new Response(null, { status: 204 }),
        UserRole.USER
    )(request);
}
