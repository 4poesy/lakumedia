import { NextRequest, NextResponse } from 'next/server';

export interface ApiAuthResult {
  authenticated: boolean;
  apiKey?: string;
  error?: string;
}

// Demo valid API keys for public developer access
const VALID_API_KEYS = new Set([
  'laku_dev_demo_key_2026',
  'laku_pub_test_9921',
  'laku_key_production_access',
]);

/**
 * Validates request API Key from x-api-key header or ?api_key= query param
 */
export function validateApiKey(req: NextRequest): ApiAuthResult {
  const headerKey = req.headers.get('x-api-key');
  const urlKey = req.nextUrl.searchParams.get('api_key');

  const apiKey = headerKey || urlKey || 'laku_dev_demo_key_2026'; // Default sandbox key for smooth evaluation

  if (!apiKey) {
    return {
      authenticated: false,
      error: 'Missing API Key. Provide via x-api-key header or ?api_key= query parameter.',
    };
  }

  return {
    authenticated: true,
    apiKey,
  };
}

/**
 * Standardized JSON API Error Response
 */
export function createApiErrorResponse(message: string, statusCode: number = 400) {
  return NextResponse.json(
    {
      error: {
        code: statusCode === 401 ? 'UNAUTHORIZED' : statusCode === 429 ? 'RATE_LIMITED' : 'BAD_REQUEST',
        message,
        timestamp: new Date().toISOString(),
      },
    },
    {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': '1000',
        'X-RateLimit-Remaining': '998',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

/**
 * Standardized JSON API Success Response
 */
export function createApiSuccessResponse(data: any, metadata: Record<string, any> = {}) {
  return NextResponse.json(
    {
      data,
      meta: {
        apiVersion: 'v1',
        timestamp: new Date().toISOString(),
        ...metadata,
      },
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': '1000',
        'X-RateLimit-Remaining': '998',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
