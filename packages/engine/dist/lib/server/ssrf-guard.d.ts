/**
 * SSRF (Server-Side Request Forgery) protection utilities.
 *
 * Validates URLs to prevent requests to internal/private network addresses.
 * Used by any API route that fetches a user-supplied URL server-side.
 */
/**
 * Validate a URL against SSRF attacks.
 * Returns null if the URL is safe, or an error message string if blocked.
 */
export declare function validateUrlForSSRF(url: string): string | null;
