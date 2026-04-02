/**
 * Browser Native TTS (Text-to-Speech) Hook
 * Uses Web Speech API for client-side text-to-speech
 * Completely free, no API key required
 */
export interface UseBrowserTTSOptions {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (error: string) => void;
    rate?: number;
    pitch?: number;
    volume?: number;
    lang?: string;
}
export declare function useBrowserTTS(options?: UseBrowserTTSOptions): {
    speak: (text: string, voiceURI?: string) => void;
    pause: () => void;
    resume: () => void;
    cancel: () => void;
    isSpeaking: boolean;
    isPaused: boolean;
    availableVoices: SpeechSynthesisVoice[];
};
//# sourceMappingURL=use-browser-tts.d.ts.map