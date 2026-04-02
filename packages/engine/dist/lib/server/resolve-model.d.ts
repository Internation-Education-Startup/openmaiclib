import { NextRequest } from '../../shims/next-server.ts';
import { ModelWithInfo } from '../ai/providers';
export interface ResolvedModel extends ModelWithInfo {
    /** Original model string (e.g. "openai/gpt-4o-mini") */
    modelString: string;
    /** Effective API key after server-side fallback resolution */
    apiKey: string;
}
/**
 * Resolve a language model from explicit parameters.
 *
 * Use this when model config comes from the request body.
 */
export declare function resolveModel(params: {
    modelString?: string;
    apiKey?: string;
    baseUrl?: string;
    providerType?: string;
    requiresApiKey?: boolean;
}): ResolvedModel;
/**
 * Resolve a language model from standard request headers.
 *
 * Reads: x-model, x-api-key, x-base-url, x-provider-type, x-requires-api-key
 */
export declare function resolveModelFromHeaders(req: NextRequest): ResolvedModel;
