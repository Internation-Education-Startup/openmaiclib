import { WebSearchResult } from '../types/web-search';
/**
 * Search the web using Tavily REST API and return structured results.
 */
export declare function searchWithTavily(params: {
    query: string;
    apiKey: string;
    maxResults?: number;
}): Promise<WebSearchResult>;
/**
 * Format search results into a markdown context block for LLM prompts.
 */
export declare function formatSearchResultsAsContext(result: WebSearchResult): string;
