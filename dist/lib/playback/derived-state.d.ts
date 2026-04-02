import { EngineMode, TriggerEvent } from './types';
export interface PlaybackRawState {
    engineMode: EngineMode;
    lectureSpeech: string | null;
    liveSpeech: string | null;
    speakingAgentId: string | null;
    thinkingState: {
        stage: string;
        agentId?: string;
    } | null;
    isCueUser: boolean;
    isTopicPending: boolean;
    chatIsStreaming: boolean;
    discussionTrigger: TriggerEvent | null;
    playbackCompleted: boolean;
    idleText: string | null;
    /** Whether the speaking agent is a student (not teacher). Provided by caller. */
    speakingStudent: boolean;
    /** Active session type — stays set between agent-loop turns (cleared only by doSessionCleanup). */
    sessionType: string | null;
}
export type PlaybackPhase = 'idle' | 'lecturePlaying' | 'lecturePaused' | 'waitingProactive' | 'discussionActive' | 'discussionPaused' | 'cueUser' | 'completed';
export type BubbleButtonState = 'bars' | 'play' | 'restart' | 'none';
export interface PlaybackView {
    /** High-level phase — "what is happening right now?" */
    phase: PlaybackPhase;
    /** Text to display in the speech bubble (without userMessage overlay) */
    sourceText: string;
    /** Who owns the speech bubble */
    bubbleRole: 'teacher' | 'agent' | 'user' | null;
    /** Who is actively speaking (avatar highlight) */
    activeRole: 'teacher' | 'agent' | 'user' | null;
    /** Bubble button state */
    buttonState: BubbleButtonState;
    /** Whether we're in a live SSE flow (suppresses lecture text) */
    isInLiveFlow: boolean;
    /** Whether any topic-related activity blocks scene switching */
    isTopicActive: boolean;
}
export declare function computePlaybackView(raw: PlaybackRawState): PlaybackView;
//# sourceMappingURL=derived-state.d.ts.map