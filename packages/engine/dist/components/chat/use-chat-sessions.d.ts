import { ChatSession, SessionType } from '../../lib/types/chat';
import { DiscussionRequest } from '../roundtable';
import { Action } from '../../lib/types/action';
interface UseChatSessionsOptions {
    onLiveSpeech?: (text: string | null, agentId?: string | null) => void;
    onSpeechProgress?: (ratio: number | null) => void;
    onThinking?: (state: {
        stage: string;
        agentId?: string;
    } | null) => void;
    onCueUser?: (fromAgentId?: string, prompt?: string) => void;
    onActiveBubble?: (messageId: string | null) => void;
    onLiveSessionError?: () => void;
    /** Called when a QA/Discussion session completes naturally (director end). */
    onStopSession?: () => void;
    onSegmentSealed?: (messageId: string, partId: string, fullText: string, agentId: string | null) => void;
    /** When provided and returns true, StreamBuffer holds on the current text item after reveal. */
    shouldHoldAfterReveal?: () => {
        holding: boolean;
        segmentDone: number;
    } | boolean;
}
export declare function useChatSessions(options?: UseChatSessionsOptions): {
    sessions: ChatSession[];
    activeSessionId: string;
    activeSessionType: SessionType;
    expandedSessionIds: Set<string>;
    isStreaming: boolean;
    createSession: (type: SessionType, title: string) => Promise<string>;
    endSession: (sessionId: string) => Promise<void>;
    endActiveSession: () => Promise<void>;
    softPauseActiveSession: () => Promise<void>;
    resumeActiveSession: () => Promise<void>;
    sendMessage: (content: string) => Promise<void>;
    startDiscussion: (request: DiscussionRequest) => Promise<void>;
    startLecture: (sceneId: string) => Promise<string>;
    addLectureMessage: (sessionId: string, action: Action, actionIndex: number) => void;
    toggleSessionExpand: (sessionId: string) => void;
    handleInterrupt: () => void;
    getLectureMessageId: (sessionId: string) => string | null;
    pauseBuffer: (sessionId: string) => void;
    resumeBuffer: (sessionId: string) => void;
    pauseActiveLiveBuffer: () => boolean;
    resumeActiveLiveBuffer: () => void;
};
export {};
