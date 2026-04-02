import { Scene } from '../types/stage';
import { EngineMode, PlaybackEngineCallbacks, PlaybackSnapshot } from './types';
import { AudioPlayer } from '../utils/audio-player';
import { ActionEngine } from '../action/engine';
export declare class PlaybackEngine {
    private scenes;
    private sceneIndex;
    private actionIndex;
    private mode;
    private consumedDiscussions;
    private savedSceneIndex;
    private savedActionIndex;
    private currentTopicState;
    private audioPlayer;
    private actionEngine;
    private callbacks;
    private sceneId;
    private currentTrigger;
    private triggerDelayTimer;
    private speechTimer;
    private speechTimerStart;
    private browserTTSActive;
    private browserTTSChunks;
    private browserTTSChunkIndex;
    private browserTTSPausedChunks;
    private speechTimerRemaining;
    constructor(scenes: Scene[], actionEngine: ActionEngine, audioPlayer: AudioPlayer, callbacks?: PlaybackEngineCallbacks);
    /** Get the current engine mode */
    getMode(): EngineMode;
    /** Export a serializable playback snapshot */
    getSnapshot(): PlaybackSnapshot;
    /** Restore playback position from a snapshot */
    restoreFromSnapshot(snapshot: PlaybackSnapshot): void;
    /** idle → playing (from beginning) */
    start(): void;
    /** idle → playing (continue from current position, e.g. after discussion end) */
    continuePlayback(): void;
    /** playing → paused | live → paused (abort SSE, truncate, topic pending) */
    pause(): void;
    /** paused → playing (TTS resume) | paused (in discussion) → live */
    resume(): void;
    /** → idle */
    stop(): void;
    /** User clicks "Join" on ProactiveCard → save cursor → live */
    confirmDiscussion(): void;
    /** User clicks "Skip" on ProactiveCard → consumed → processNext */
    skipDiscussion(): void;
    /** End discussion → restore lecture → idle (user clicks "start" to continue) */
    handleEndDiscussion(): void;
    /**
     * Exit live discussion mode after a request failure without treating it as a
     * normal discussion end. The chat session stays retryable; this only restores
     * the playback engine to a coherent non-live state.
     */
    handleDiscussionError(): void;
    /** User sends a message during playback → interrupt → live mode */
    handleUserInterrupt(text: string): void;
    /** Whether all remaining actions have been consumed (no speech left to play) */
    isExhausted(): boolean;
    private setMode;
    private restoreSavedLectureState;
    /**
     * Get the current action, or null if playback is complete.
     * Advances sceneIndex automatically when a scene's actions are exhausted.
     */
    private getCurrentAction;
    /**
     * Core processing loop: consume the next action.
     */
    private processNext;
    /**
     * Split text into sentence-level chunks for sequential playback.
     * Chrome has a bug where utterances >~15s are silently cut off and onend
     * never fires, causing the engine to hang. Chunking avoids this.
     */
    private splitIntoChunks;
    /**
     * Play text using the Web Speech API (browser-native TTS).
     * Splits text into sentence-level chunks to avoid Chrome's ~15s cutoff.
     * Uses cancel+re-speak for pause/resume (Firefox compatibility).
     */
    private playBrowserTTS;
    /** Speak the current chunk; on completion, advance to next or finish. */
    private playBrowserTTSChunk;
    /**
     * Wait for speechSynthesis voices to load (Chrome loads them asynchronously).
     * Caches result so subsequent calls return immediately.
     */
    private cachedVoices;
    private ensureVoicesLoaded;
    /** Cancel any active browser-native TTS */
    private cancelBrowserTTS;
}
//# sourceMappingURL=engine.d.ts.map