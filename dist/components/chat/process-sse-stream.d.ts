import { StreamBuffer } from '../../lib/buffer/stream-buffer';
/**
 * Thin SSE parser — reads the /api/chat response stream and pushes
 * typed events into a StreamBuffer. All pacing, state management,
 * and UI updates are handled by the buffer's tick loop and callbacks.
 */
export declare function processSSEStream(response: Response, sessionId: string, buffer: StreamBuffer, signal?: AbortSignal): Promise<void>;
//# sourceMappingURL=process-sse-stream.d.ts.map