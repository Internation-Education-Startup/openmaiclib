/**
 * Shim for next/server — provides type-compatible stubs for server-side code.
 * These are only used in lib/server/ which runs on Node.js (eduserver),
 * not in the browser.
 */
export declare class NextResponse extends Response {
    static json(body: unknown, init?: ResponseInit): Response;
    static redirect(url: string | URL, status?: number): Response;
}
export declare class NextRequest extends Request {
    nextUrl: URL;
    constructor(input: RequestInfo, init?: RequestInit);
}
