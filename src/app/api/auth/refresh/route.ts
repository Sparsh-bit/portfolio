/**
 * Token Refresh API
 * =================
 * Refreshes access tokens using a valid refresh token.
 * 
 * SECURITY MEASURES:
 * - Validates refresh token signature and expiry
 * - Rate limited to prevent abuse
 * - Returns new access token only (not new refresh token)
 */

// Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import {
    authRoute,
    verifyToken,
    generateAccessToken,
} from '@/lib/security';

async function refreshHandler(request: NextRequest) {
    try {
        const body = await request.json();
        const { refreshToken } = body;

        if (!refreshToken) {
            return NextResponse.json(
                { error: 'Refresh token is required' },
                { status: 400 }
            );
        }

        // Verify refresh token
        const payload = await verifyToken(refreshToken);

        if (!payload) {
            return NextResponse.json(
                { error: 'Invalid or expired refresh token' },
                { status: 401 }
            );
        }

        // Ensure it's a refresh token
        if (payload.type !== 'refresh') {
            return NextResponse.json(
                { error: 'Invalid token type' },
                { status: 401 }
            );
        }

        // Generate new access token
        const accessToken = await generateAccessToken({
            id: payload.sub!,
            email: payload.email,
            role: payload.role,
        });

        return NextResponse.json({
            accessToken,
            expiresIn: '15m',
        });

    } catch (error) {
        console.error('Token refresh error:', error);
        return NextResponse.json(
            { error: 'An error occurred during token refresh' },
            { status: 500 }
        );
    }
}

export const POST = authRoute(refreshHandler);

export async function OPTIONS(request: NextRequest) {
    return authRoute(async () => new Response(null, { status: 204 }))(request);
}
