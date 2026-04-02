import { StageStore } from '../api/stage-api';
import { AudioPlayer } from '../utils/audio-player';
import { Action } from '../types/action';
export declare class ActionEngine {
    private stageStore;
    private stageAPI;
    private audioPlayer;
    private effectTimer;
    constructor(stageStore: StageStore, audioPlayer?: AudioPlayer);
    /** Clean up timers when the engine is no longer needed */
    dispose(): void;
    /**
     * Execute a single action.
     * Fire-and-forget actions return immediately.
     * Synchronous actions return a Promise that resolves when the action is complete.
     */
    execute(action: Action): Promise<void>;
    /** Clear all active visual effects */
    clearEffects(): void;
    /** Schedule auto-clear for fire-and-forget effects */
    private scheduleEffectClear;
    private executeSpotlight;
    private executeLaser;
    private executeSpeech;
    private executePlayVideo;
    /**
     * Look up a video/image element's src in the current stage's scenes.
     * Returns the src if it's a media placeholder ID (gen_vid_*, gen_img_*), null otherwise.
     */
    private resolveMediaPlaceholderId;
    /** Auto-open the whiteboard if it's not already open */
    private ensureWhiteboardOpen;
    private executeWbOpen;
    private executeWbDrawText;
    private executeWbDrawShape;
    private executeWbDrawChart;
    private executeWbDrawLatex;
    private executeWbDrawTable;
    private executeWbDrawLine;
    private executeWbDelete;
    private executeWbClear;
    private executeWbClose;
}
//# sourceMappingURL=engine.d.ts.map