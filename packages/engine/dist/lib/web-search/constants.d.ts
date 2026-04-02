import { WebSearchProviderId, WebSearchProviderConfig } from './types';
/**
 * Web Search Provider Registry
 */
export declare const WEB_SEARCH_PROVIDERS: Record<WebSearchProviderId, WebSearchProviderConfig>;
/**
 * Get all available web search providers
 */
export declare function getAllWebSearchProviders(): WebSearchProviderConfig[];
