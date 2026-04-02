/**
 * Shim for next/server — provides type-compatible stubs for server-side code.
 * These are only used in lib/server/ which runs on Node.js (eduserver),
 * not in the browser.
 */

export class NextResponse extends Response {
  static json(body: unknown, init?: ResponseInit) {
    return new Response(JSON.stringify(body), {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });
  }

  static redirect(url: string | URL, status?: number) {
    return Response.redirect(url, status);
  }
}

export class NextRequest extends Request {
  nextUrl: URL;
  constructor(input: RequestInfo, init?: RequestInit) {
    super(input, init);
    this.nextUrl = new URL(typeof input === 'string' ? input : input.url);
  }
}
