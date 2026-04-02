import { DirectorState } from '../types/chat';
/**
 * StreamBuffer — unified presentation pacing layer.
 *
 * Sits between data sources (SSE stream / PlaybackEngine) and React state.
 * Events are pushed into an ordered queue; a fixed-rate tick loop reveals
 * text character-by-character and fires typed callbacks so both the Chat
 * area and the Roundtable bubble consume identically-paced content.
 *
 * Key invariants:
 *   - ONE source of pacing (this tick loop) — no double typewriter.
 *   - pause() is O(1) instant — tick returns immediately.
 *   - Actions fire only when the tick cursor reaches them (after preceding text).
 *   - Roundtable sees only the current speech segment (resets on action / agent switch).
 */
export interface AgentStartItem {
    kind: 'agent_start';
    messageId: string;
    agentId: string;
    agentName: string;
    avatar?: string;
    color?: string;
}
export interface AgentEndItem {
    kind: 'agent_end';
    messageId: string;
    agentId: string;
}
export interface TextItem {
    kind: 'text';
    messageId: string;
    agentId: string;
    /** Unique ID for this text part — distinguishes multiple text items within one message (e.g. lecture). */
    partId: string;
    /** Growable — SSE deltas append here. */
    text: string;
    /** When true, no more text will be appended. Tick can advance past once fully revealed. */
    sealed: boolean;
}
export interface ActionItem {
    kind: 'action';
    messageId: string;
    actionId: string;
    actionName: string;
    params: Record<string, unknown>;
    agentId: string;
}
export interface ThinkingItem {
    kind: 'thinking';
    stage: string;
    agentId?: string;
}
export interface CueUserItem {
    kind: 'cue_user';
    fromAgentId?: string;
    prompt?: string;
}
export interface DoneItem {
    kind: 'done';
    totalActions: number;
    totalAgents: number;
    agentHadContent?: boolean;
    directorState?: DirectorState;
}
export interface ErrorItem {
    kind: 'error';
    message: string;
}
export type BufferItem = AgentStartItem | AgentEndItem | TextItem | ActionItem | ThinkingItem | CueUserItem | DoneItem | ErrorItem;
export interface StreamBufferCallbacks {
    onAgentStart(data: AgentStartItem): void;
    onAgentEnd(data: AgentEndItem): void;
    /**
     * Fired each tick while a text item is being revealed.
     * @param messageId  — which message to update
     * @param partId     — unique ID for this text part (stable across ticks)
     * @param revealedText — text visible so far (slice of full text)
     * @param isComplete — true when this text item is fully revealed AND sealed
     */
    onTextReveal(messageId: string, partId: string, revealedText: string, isComplete: boolean): void;
    /** Fired when tick reaches an action item. Callers should execute the effect + add badge. */
    onActionReady(messageId: string, data: ActionItem): void;
    /**
     * Unified speech feed for the Roundtable bubble.
     * Reports only the CURRENT segment text (resets on action / agent switch).
     * Called with (null, null) when buffer completes or is disposed.
     */
    onLiveSpeech(text: string | null, agentId: string | null): void;
    /**
     * Speech progress ratio for the Roundtable bubble auto-scroll.
     * Fired each tick during text reveal: ratio = charCursor / totalTextLength.
     * Called with null when buffer completes or is disposed.
     */
    onSpeechProgress(ratio: number | null): void;
    onThinking(data: {
        stage: string;
        agentId?: string;
    } | null): void;
    onCueUser(fromAgentId?: string, prompt?: string): void;
    onDone(data: {
        totalActions: number;
        totalAgents: number;
        agentHadContent?: boolean;
        directorState?: DirectorState;
    }): void;
    onError(message: string): void;
    onSegmentSealed?: (messageId: string, partId: string, fullText: string, agentId: string | null) => void;
    /**
     * When provided, called after a text item is fully revealed and sealed.
     * If it returns true, the tick loop will NOT advance to the next item —
     * the bubble stays on the current text (e.g. waiting for TTS playback to finish).
     */
    shouldHoldAfterReveal?: () => {
        holding: boolean;
        segmentDone: number;
    } | boolean;
}
export interface StreamBufferOptions {
    /** Milliseconds between ticks. Default: 30 */
    tickMs?: number;
    /** Characters revealed per tick. Default: 1  (≈33 chars/s) */
    charsPerTick?: number;
    /**
     * Fixed delay (ms) after a text segment is fully revealed before advancing
     * to the next item. Gives the reader a breathing pause after each speech
     * block. Default: 0 (no delay).
     */
    postTextDelayMs?: number;
    /**
     * Delay (ms) after firing an action callback before advancing to the next
     * item. Gives action animations time to play out. Default: 0.
     */
    actionDelayMs?: number;
}
export declare class StreamBuffer {
    private items;
    private readIndex;
    private charCursor;
    private currentSegmentText;
    private currentAgentId;
    private _paused;
    private _disposed;
    private timer;
    private _dwellTicksRemaining;
    /** True when a text item's post-delay has elapsed and we're waiting for TTS to finish. */
    private _holdingForTTS;
    private _holdSegmentSnapshot;
    private readonly tickMs;
    private readonly charsPerTick;
    private readonly postTextDelayTicks;
    private readonly actionDelayTicks;
    private readonly cb;
    private partCounter;
    private _drainResolve;
    private _drainReject;
    constructor(callbacks: StreamBufferCallbacks, options?: StreamBufferOptions);
    pushAgentStart(data: Omit<AgentStartItem, 'kind'>): void;
    pushAgentEnd(data: Omit<AgentEndItem, 'kind'>): void;
    /**
     * Append text for a message.
     * If the last queue item is an unsealed text item for the same messageId,
     * the delta is appended in-place. Otherwise a new text item is created.
     */
    pushText(messageId: string, delta: string, agentId?: string): void;
    /** Mark the current (last) text item as complete — no more appends expected. */
    sealText(messageId: string): void;
    pushAction(data: Omit<ActionItem, 'kind'>): void;
    pushThinking(data: {
        stage: string;
        agentId?: string;
    }): void;
    pushCueUser(data: {
        fromAgentId?: string;
        prompt?: string;
    }): void;
    pushDone(data: {
        totalActions: number;
        totalAgents: number;
        agentHadContent?: boolean;
        directorState?: DirectorState;
    }): void;
    pushError(message: string): void;
    /** Start the tick loop. Idempotent — calling twice is safe. */
    start(): void;
    /** Instantly pause — tick becomes a no-op. */
    pause(): void;
    /** Resume from exactly where we left off. */
    resume(): void;
    /**
     * Returns a Promise that resolves when the buffer has processed all items
     * including the final `done` item. Rejects if the buffer is disposed/shutdown
     * before draining completes.
     *
     * NOTE: This will block indefinitely while the buffer is paused, by design.
     * Buffer-level pause (see `livePausedRef` in use-chat-sessions) freezes ALL
     * forward progress — the tick loop is a no-op while `_paused` is true, so
     * no items are processed and drain never fires until resumed.
     */
    waitUntilDrained(): Promise<void>;
    get paused(): boolean;
    get disposed(): boolean;
    /**
     * Flush: instantly reveal everything remaining.
     * Used when restoring persisted sessions or force-completing.
     */
    flush(): void;
    /** Stop tick loop, release resources. No more callbacks after this. */
    dispose(): void;
    /**
     * Stop the tick timer and mark disposed WITHOUT firing final onLiveSpeech.
     * Used when replacing a buffer (e.g. resume after soft-pause) to avoid
     * the dispose callback clearing roundtable state via a stale microtask.
     */
    shutdown(): void;
    /** Seal the last text item in the queue (if any). */
    private sealLastText;
    private tick;
    /**
     * After processing a non-text item, keep advancing through consecutive
     * non-text items in the same tick. Stop when we hit a text item or
     * the end of the queue — the next tick will handle the text item
     * (so we don't skip the character-by-character reveal).
     *
     * Also stops when an action triggers a delay so its animation can play.
     */
    private advanceNonText;
}
