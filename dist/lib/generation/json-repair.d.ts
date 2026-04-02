/**
 * JSON parsing with fallback strategies for AI-generated responses.
 */
export declare function parseJsonResponse<T>(response: string): T | null;
/**
 * Try to parse JSON with various fixes for common AI response issues
 */
export declare function tryParseJson<T>(jsonStr: string): T | null;
//# sourceMappingURL=json-repair.d.ts.map