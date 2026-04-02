import { ASRModelConfig } from './types';
/**
 * Result of ASR transcription
 */
export interface ASRTranscriptionResult {
    text: string;
}
/**
 * Transcribe audio using specified ASR provider
 */
export declare function transcribeAudio(config: ASRModelConfig, audioBuffer: Buffer | Blob): Promise<ASRTranscriptionResult>;
/**
 * Get current ASR configuration from settings store
 * Note: This function should only be called in browser context
 */
export declare function getCurrentASRConfig(): Promise<ASRModelConfig>;
export { getAllASRProviders, getASRProvider, getASRSupportedLanguages } from './constants';
//# sourceMappingURL=asr-providers.d.ts.map