export interface TTSPreviewOptions {
    text: string;
    providerId: string;
    modelId?: string;
    voice: string;
    speed: number;
    apiKey?: string;
    baseUrl?: string;
}
/**
 * Shared hook for TTS preview playback (browser-native and API-based).
 *
 * - `previewing`: true while a preview is active (including audio playback)
 * - `startPreview(opts)`: start a preview; rejects with non-abort errors
 * - `stopPreview()`: cancel any active preview and reset state
 */
export declare function useTTSPreview(): {
    previewing: boolean;
    startPreview: (options: TTSPreviewOptions) => Promise<void>;
    stopPreview: () => void;
};
//# sourceMappingURL=use-tts-preview.d.ts.map