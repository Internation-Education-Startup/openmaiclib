/**
 * Playback Storage - Persist playback engine state to IndexedDB
 *
 * Stores minimal state needed to resume playback from a breakpoint:
 * position (sceneIndex + actionIndex) and consumed discussions.
 */
export interface PlaybackSnapshot {
    sceneIndex: number;
    actionIndex: number;
    consumedDiscussions: string[];
    sceneId?: string;
}
/**
 * Save playback state for a stage.
 * Each stage has at most one playback state record.
 */
export declare function savePlaybackState(stageId: string, snapshot: PlaybackSnapshot): Promise<void>;
/**
 * Load playback state for a stage.
 * Returns null if no saved state exists.
 */
export declare function loadPlaybackState(stageId: string): Promise<PlaybackSnapshot | null>;
/**
 * Clear playback state for a stage (e.g. on playback complete or stop).
 */
export declare function clearPlaybackState(stageId: string): Promise<void>;
