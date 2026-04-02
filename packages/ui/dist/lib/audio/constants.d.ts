import { TTSProviderId, TTSProviderConfig, TTSVoiceInfo, ASRProviderId, ASRProviderConfig } from './types';
/**
 * TTS Provider Registry
 *
 * Central registry for all TTS providers.
 * Keep in sync with TTSProviderId type definition.
 */
export declare const MINIMAX_TTS_MODELS: readonly [{
    readonly id: "speech-2.8-hd";
    readonly name: "Speech 2.8 HD";
}, {
    readonly id: "speech-2.8-turbo";
    readonly name: "Speech 2.8 Turbo";
}, {
    readonly id: "speech-2.6-hd";
    readonly name: "Speech 2.6 HD";
}, {
    readonly id: "speech-2.6-turbo";
    readonly name: "Speech 2.6 Turbo";
}, {
    readonly id: "speech-02-hd";
    readonly name: "Speech 02 HD";
}, {
    readonly id: "speech-02-turbo";
    readonly name: "Speech 02 Turbo";
}];
export declare const TTS_PROVIDERS: Record<TTSProviderId, TTSProviderConfig>;
/**
 * ASR Provider Registry
 *
 * Central registry for all ASR providers.
 * Keep in sync with ASRProviderId type definition.
 */
export declare const ASR_PROVIDERS: Record<ASRProviderId, ASRProviderConfig>;
/**
 * Get all available TTS providers
 */
export declare function getAllTTSProviders(): TTSProviderConfig[];
/**
 * Get TTS provider by ID
 */
export declare function getTTSProvider(providerId: TTSProviderId): TTSProviderConfig | undefined;
/**
 * Default voice for each TTS provider.
 * Used when switching providers or testing a non-active provider.
 */
export declare const DEFAULT_TTS_VOICES: Record<TTSProviderId, string>;
export declare const DEFAULT_TTS_MODELS: Record<TTSProviderId, string>;
/**
 * Get voices for a specific TTS provider
 */
export declare function getTTSVoices(providerId: TTSProviderId): TTSVoiceInfo[];
/**
 * Get all available ASR providers
 */
export declare function getAllASRProviders(): ASRProviderConfig[];
/**
 * Get ASR provider by ID
 */
export declare function getASRProvider(providerId: ASRProviderId): ASRProviderConfig | undefined;
/**
 * Get supported languages for a specific ASR provider
 */
export declare function getASRSupportedLanguages(providerId: ASRProviderId): string[];
