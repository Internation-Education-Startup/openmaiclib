type PlayBrowserTTSPreviewOptions = {
    text: string;
    voice?: string;
    rate?: number;
    voices?: SpeechSynthesisVoice[];
};
export declare function isBrowserTTSAbortError(error: unknown): boolean;
/** Wait for browser voices to load, with a 2s timeout fallback. */
export declare function ensureVoicesLoaded(): Promise<SpeechSynthesisVoice[]>;
/** Resolve a browser voice by voiceURI, name, or lang, with language fallback by text. */
export declare function resolveBrowserVoice(voices: SpeechSynthesisVoice[], voiceNameOrLang: string, text: string): {
    voice: SpeechSynthesisVoice | null;
    lang: string;
};
/**
 * Play a short browser-native TTS preview.
 *
 * Notes:
 * - Uses the global speechSynthesis queue, so it must cancel queued utterances
 *   before starting a new preview.
 * - Resolves only after the utterance has started and then ended successfully.
 */
export declare function playBrowserTTSPreview(options: PlayBrowserTTSPreviewOptions): {
    promise: Promise<void>;
    cancel: () => void;
};
export {};
