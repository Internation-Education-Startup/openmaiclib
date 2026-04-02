/**
 * Audio Player - Audio player interface
 *
 * Handles audio playback, pause, stop, and other operations
 * Loads pre-generated TTS audio files from IndexedDB
 *
 */
/**
 * Audio player implementation
 */
export declare class AudioPlayer {
    private audio;
    private onEndedCallback;
    private muted;
    private volume;
    private playbackRate;
    /**
     * Play audio (from URL or IndexedDB pre-generated cache)
     * @param audioId Audio ID
     * @param audioUrl Optional server-generated audio URL (takes priority over IndexedDB)
     * @returns true if audio started playing, false if no audio (TTS disabled or not generated)
     */
    play(audioId: string, audioUrl?: string): Promise<boolean>;
    /**
     * Pause playback
     */
    pause(): void;
    /**
     * Stop playback
     */
    stop(): void;
    /**
     * Resume playback
     */
    resume(): void;
    /**
     * Get current playback status (actively playing, not paused)
     */
    isPlaying(): boolean;
    /**
     * Whether there is active audio (playing or paused, but not ended)
     * Used to decide whether to resume playback or skip to the next line
     */
    hasActiveAudio(): boolean;
    /**
     * Get current playback time (milliseconds)
     */
    getCurrentTime(): number;
    /**
     * Get audio duration (milliseconds)
     */
    getDuration(): number;
    /**
     * Set playback ended callback
     */
    onEnded(callback: () => void): void;
    /**
     * Set mute state (takes effect immediately on currently playing audio)
     */
    setMuted(muted: boolean): void;
    /**
     * Set volume (0-1)
     */
    setVolume(volume: number): void;
    /**
     * Set playback speed (takes effect immediately on currently playing audio)
     */
    setPlaybackRate(rate: number): void;
    /**
     * Destroy the player
     */
    destroy(): void;
}
/**
 * Create an audio player instance
 */
export declare function createAudioPlayer(): AudioPlayer;
