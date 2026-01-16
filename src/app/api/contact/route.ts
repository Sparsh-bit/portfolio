/**
 * Contact Form API
 * ================
 * Public endpoint for contact form submissions.
 * 
 * SECURITY MEASURES:
 * - Strict rate limiting (3 submissions per hour)
 * - Input validation and sanitization
 * - CORS protection
 */

import { NextRequest, NextResponse } from 'next/server';
import { withSecurity, type SecurityContext } from '@/lib/security';

// Input validation
function validateContactForm(data: Record<string, unknown>): {
    valid: boolean;
    errors: string[];
    sanitized?: { name: string; email: string; message: string };
} {
    const errors: string[] = [];
    const { name, email, message } = data;

    // Name validation
    if (!name || typeof name !== 'string') {
        errors.push('Name is required');
    } else if (name.length < 2 || name.length > 100) {
        errors.push('Name must be between 2 and 100 characters');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string') {
        errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
        errors.push('Invalid email format');
    }

    // Message validation
    if (!message || typeof message !== 'string') {
        errors.push('Message is required');
    } else if (message.length < 10 || message.length > 5000) {
        errors.push('Message must be between 10 and 5000 characters');
    }

    if (errors.length > 0) {
        return { valid: false, errors };
    }

    // Sanitize inputs (basic XSS prevention)
    const sanitize = (str: string) => str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .trim();

    return {
        valid: true,
        errors: [],
        sanitized: {
            name: sanitize(name as string),
            email: (email as string).toLowerCase().trim(),
            message: sanitize(message as string),
        },
    };
}

async function contactHandler(
    request: NextRequest,
    context: SecurityContext
) {
    try {
        const body = await request.json();
        const validation = validateContactForm(body);

        if (!validation.valid) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.errors },
                { status: 400 }
            );
        }

        const { name, email, message } = validation.sanitized!;

        // In production, send email or store in database
        console.log(`[${context.requestId}] Contact form submission:`, {
            name,
            email,
            messageLength: message.length,
        });

        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 100));

        return NextResponse.json({
            success: true,
            message: 'Thank you for your message. We will get back to you soon!',
            requestId: context.requestId,
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'An error occurred while processing your request' },
            { status: 500 }
        );
    }
}

// Public route with contact-specific rate limiting
export const POST = withSecurity(contactHandler, {
    public: true,
    rateLimitType: 'contact',
});

export async function OPTIONS(request: NextRequest) {
    return withSecurity(
        async () => new Response(null, { status: 204 }),
        { public: true }
    )(request);
}
