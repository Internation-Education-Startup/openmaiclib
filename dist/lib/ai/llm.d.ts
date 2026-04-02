import { generateText, streamText, GenerateTextResult, StreamTextResult } from 'ai';
import { ThinkingConfig } from '../types/provider';
export type { ThinkingConfig } from '../types/provider';
type GenerateTextParams = Parameters<typeof generateText>[0];
type StreamTextParams = Parameters<typeof streamText>[0];
/**
 * Options for LLM call retry on validation failure.
 * This is separate from the AI SDK's built-in maxRetries (which handles network/5xx errors).
 */
export interface LLMRetryOptions {
    /** Max retry attempts when validate() fails or the response is empty (default: 0 = no retry) */
    retries?: number;
    /** Custom validation function. Return true to accept the result, false to retry.
     *  Default: checks that response text is non-empty. */
    validate?: (text: string) => boolean;
}
/**
 * Unified wrapper around `generateText`.
 *
 * @param params - Same parameters as AI SDK's `generateText`
 * @param source - A short label for log grouping (e.g. 'scene-stream', 'pbl-chat')
 * @param retryOptions - Optional retry-on-validation-failure settings
 * @param thinking - Optional per-call thinking config (overrides global LLM_THINKING_DISABLED)
 */
export declare function callLLM<T extends GenerateTextParams>(params: T, source: string, retryOptions?: LLMRetryOptions, thinking?: ThinkingConfig): Promise<GenerateTextResult<any, any>>;
/**
 * Unified wrapper around `streamText`.
 *
 * Returns the same StreamTextResult.
 *
 * @param params - Same parameters as AI SDK's `streamText`
 * @param source - A short label for log grouping
 * @param thinking - Optional per-call thinking config (overrides global LLM_THINKING_DISABLED)
 */
export declare function streamLLM<T extends StreamTextParams>(params: T, source: string, thinking?: ThinkingConfig): StreamTextResult<any, any>;
//# sourceMappingURL=llm.d.ts.map