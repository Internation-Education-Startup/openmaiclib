/**
 * Browser Native ASR (Speech Recognition) Hook
 * Uses Web Speech API for client-side speech recognition
 * Completely free, no API key required
 */
export type ASRErrorCode = 'not-supported' | 'no-speech' | 'audio-capture' | 'not-allowed' | 'network' | 'aborted' | 'unknown';
export interface UseBrowserASROptions {
    onTranscription?: (text: string) => void;
    onError?: (errorCode: ASRErrorCode) => void;
    language?: string;
    continuous?: boolean;
    interimResults?: boolean;
}
export declare function useBrowserASR(options?: UseBrowserASROptions): {
    isSupported: boolean;
    isListening: boolean;
    interimTranscript: string;
    startListening: () => void;
    stopListening: () => void;
};
//# sourceMappingURL=use-browser-asr.d.ts.map