/**
 * Proxy-aware fetch for server-side use.
 *
 * Automatically routes requests through HTTP/HTTPS proxy when
 * the standard environment variables are set:
 *   - https_proxy / HTTPS_PROXY
 *   - http_proxy / HTTP_PROXY
 *
 * Node.js's built-in fetch does NOT respect these env vars,
 * so we use undici's ProxyAgent when a proxy is configured.
 *
 * Usage: import { proxyFetch } from '@/lib/server/proxy-fetch';
 *        const res = await proxyFetch('https://api.openai.com/v1/...', { ... });
 */
/**
 * Drop-in replacement for fetch() that respects proxy env vars.
 * Falls back to global fetch when no proxy is configured.
 */
export declare function proxyFetch(input: string | URL, init?: RequestInit): Promise<Response>;
//# sourceMappingURL=proxy-fetch.d.ts.map