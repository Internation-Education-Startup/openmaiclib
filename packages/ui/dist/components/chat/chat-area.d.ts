import { SessionType } from '../../lib/types/chat';
import { DiscussionRequest } from '../roundtable';
import { Action } from '../../lib/types/action';
interface ChatAreaProps {
    className?: string;
    width?: number;
    onWidthChange?: (width: number) => void;
    collapsed?: boolean;
    onCollapseChange?: (collapsed: boolean) => void;
    activeBubbleId?: string | null;
    onActiveBubble?: (messageId: string | null) => void;
    onLiveSpeech?: (text: string | null, agentId?: string | null) => void;
    onSpeechProgress?: (ratio: number | null) => void;
    onThinking?: (state: {
        stage: string;
        agentId?: string;
    } | null) => void;
    onCueUser?: (fromAgentId?: string, prompt?: string) => void;
    onLiveSessionError?: () => void;
    onStopSession?: () => void;
    onSegmentSealed?: (messageId: string, partId: string, fullText: string, agentId: string | null) => void;
    /** When provided and returns true, StreamBuffer holds on the current text item after reveal. */
    shouldHoldAfterReveal?: () => {
        holding: boolean;
        segmentDone: number;
    } | boolean;
    currentSceneId?: string | null;
}
export interface ChatAreaRef {
    createSession: (type: SessionType, title: string) => Promise<string>;
    endSession: (sessionId: string) => Promise<void>;
    endActiveSession: () => Promise<void>;
    softPauseActiveSession: () => Promise<void>;
    resumeActiveSession: () => Promise<void>;
    sendMessage: (content: string) => Promise<void>;
    startDiscussion: (request: DiscussionRequest) => Promise<void>;
    startLecture: (sceneId: string) => Promise<string>;
    addLectureMessage: (sessionId: string, action: Action, actionIndex: number) => void;
    getIsStreaming: () => boolean;
    getActiveSessionType: () => string | null;
    getLectureMessageId: (sessionId: string) => string | null;
    pauseBuffer: (sessionId: string) => void;
    resumeBuffer: (sessionId: string) => void;
    pauseActiveLiveBuffer: () => boolean;
    resumeActiveLiveBuffer: () => void;
    switchToTab: (tab: 'lecture' | 'chat') => void;
}
export declare const ChatArea: import('react').ForwardRefExoticComponent<ChatAreaProps & import('react').RefAttributes<ChatAreaRef>>;
export {};
