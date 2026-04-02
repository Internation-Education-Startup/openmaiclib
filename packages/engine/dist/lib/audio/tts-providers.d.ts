import { TTSModelConfig } from './types';
/**
 * Result of TTS generation
 */
export interface TTSGenerationResult {
    audio: Uint8Array;
    format: string;
}
/**
 * Thrown when a TTS provider returns a rate-limit / concurrency-quota error.
 * Allows downstream consumers to distinguish rate-limit errors from other TTS failures.
 *
 * TODO: The API route currently catches all errors uniformly as GENERATION_FAILED.
 * This class enables future retry/backoff logic without changing the throw sites.
 */
export declare class TTSRateLimitError extends Error {
    readonly provider: string;
    constructor(provider: string, message: string);
}
/**
 * Generate speech using specified TTS provider
 */
export declare function generateTTS(config: TTSModelConfig, text: string): Promise<TTSGenerationResult>;
/**
 * Get current TTS configuration from settings store
 * Note: This function should only be called in browser context
 */
export declare function getCurrentTTSConfig(): Promise<TTSModelConfig>;
export { getAllTTSProviders, getTTSProvider, getTTSVoices } from './constants';
