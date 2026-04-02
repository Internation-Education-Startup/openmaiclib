/**
 * Server-side Provider Configuration
 *
 * Loads provider configs from YAML (primary) + environment variables (fallback).
 * Keys never leave the server — only provider IDs and metadata are exposed via API.
 */
/** Returns server-configured LLM providers (no apiKeys) */
export declare function getServerProviders(): Record<string, {
    models?: string[];
    baseUrl?: string;
}>;
/** Resolve API key: client key > server key > empty string */
export declare function resolveApiKey(providerId: string, clientKey?: string): string;
/** Resolve base URL: client > server > undefined */
export declare function resolveBaseUrl(providerId: string, clientBaseUrl?: string): string | undefined;
/** Resolve proxy URL for a provider (server config only) */
export declare function resolveProxy(providerId: string): string | undefined;
export declare function getServerTTSProviders(): Record<string, {
    baseUrl?: string;
}>;
export declare function resolveTTSApiKey(providerId: string, clientKey?: string): string;
export declare function resolveTTSBaseUrl(providerId: string, clientBaseUrl?: string): string | undefined;
export declare function getServerASRProviders(): Record<string, {
    baseUrl?: string;
}>;
export declare function resolveASRApiKey(providerId: string, clientKey?: string): string;
export declare function resolveASRBaseUrl(providerId: string, clientBaseUrl?: string): string | undefined;
export declare function getServerPDFProviders(): Record<string, {
    baseUrl?: string;
}>;
export declare function resolvePDFApiKey(providerId: string, clientKey?: string): string;
export declare function resolvePDFBaseUrl(providerId: string, clientBaseUrl?: string): string | undefined;
export declare function getServerImageProviders(): Record<string, Record<string, never>>;
export declare function resolveImageApiKey(providerId: string, clientKey?: string): string;
export declare function resolveImageBaseUrl(providerId: string, clientBaseUrl?: string): string | undefined;
export declare function getServerVideoProviders(): Record<string, Record<string, never>>;
export declare function resolveVideoApiKey(providerId: string, clientKey?: string): string;
export declare function resolveVideoBaseUrl(providerId: string, clientBaseUrl?: string): string | undefined;
/** Returns server-configured web search providers (no apiKeys exposed) */
export declare function getServerWebSearchProviders(): Record<string, {
    baseUrl?: string;
}>;
/** Resolve Tavily API key: client key > server key > TAVILY_API_KEY env > empty */
export declare function resolveWebSearchApiKey(clientKey?: string): string;
//# sourceMappingURL=provider-config.d.ts.map