export interface StreamingTextOptions {
    text: string;
    speed?: number;
    onComplete?: () => void;
    enabled?: boolean;
}
export interface StreamingTextResult {
    displayedText: string;
    isStreaming: boolean;
    skip: () => void;
    reset: () => void;
}
/**
 * Streaming Text Hook
 *
 * Implements a character-by-character text display effect
 *
 * @param options - Configuration options
 * @returns Streaming text state and control functions
 */
export declare function useStreamingText(options: StreamingTextOptions): StreamingTextResult;
