import { AudioIndicatorState } from './audio-indicator';
import { DiscussionAction } from '../../lib/types/action';
import { EngineMode, PlaybackView } from '../../lib/playback';
import { Participant } from '../../lib/types/roundtable';
export interface DiscussionRequest {
    topic: string;
    prompt?: string;
    agentId?: string;
}
interface RoundtableProps {
    readonly mode?: 'playback' | 'autonomous';
    readonly initialParticipants?: Participant[];
    readonly playbackView?: PlaybackView;
    readonly currentSpeech?: string | null;
    readonly lectureSpeech?: string | null;
    readonly idleText?: string | null;
    readonly playbackCompleted?: boolean;
    readonly discussionRequest?: DiscussionAction | null;
    readonly engineMode?: EngineMode;
    readonly isStreaming?: boolean;
    readonly sessionType?: 'qa' | 'discussion';
    readonly speakingAgentId?: string | null;
    readonly audioIndicatorState?: AudioIndicatorState;
    readonly audioAgentId?: string | null;
    readonly speechProgress?: number | null;
    readonly showEndFlash?: boolean;
    readonly endFlashSessionType?: 'qa' | 'discussion';
    readonly thinkingState?: {
        stage: string;
        agentId?: string;
    } | null;
    readonly isCueUser?: boolean;
    readonly isTopicPending?: boolean;
    readonly onMessageSend?: (message: string) => void;
    readonly onDiscussionStart?: (request: DiscussionAction) => void;
    readonly onDiscussionSkip?: () => void;
    readonly onStopDiscussion?: () => void;
    readonly onInputActivate?: () => void;
    readonly onResumeTopic?: () => void;
    readonly onPlayPause?: () => void;
    readonly isDiscussionPaused?: boolean;
    readonly onDiscussionPause?: () => void;
    readonly onDiscussionResume?: () => void;
    readonly totalActions?: number;
    readonly currentActionIndex?: number;
    readonly currentSceneIndex?: number;
    readonly scenesCount?: number;
    readonly whiteboardOpen?: boolean;
    readonly sidebarCollapsed?: boolean;
    readonly chatCollapsed?: boolean;
    readonly onToggleSidebar?: () => void;
    readonly onToggleChat?: () => void;
    readonly onPrevSlide?: () => void;
    readonly onNextSlide?: () => void;
    readonly onWhiteboardClose?: () => void;
    readonly isPresenting?: boolean;
    readonly controlsVisible?: boolean;
    readonly onTogglePresentation?: () => void;
    readonly onPresentationInteractionChange?: (active: boolean) => void;
    /** Ref to the fullscreen container — passed to ProactiveCard so its portal
     *  renders inside the top-layer during presentation mode. */
    readonly fullscreenContainerRef?: React.RefObject<HTMLDivElement | null>;
}
export declare function Roundtable({ mode: _mode, initialParticipants, playbackView, currentSpeech, lectureSpeech, idleText, playbackCompleted, discussionRequest, engineMode, isStreaming, sessionType, speakingAgentId, audioIndicatorState, audioAgentId, speechProgress: _speechProgress, showEndFlash, endFlashSessionType, thinkingState, isCueUser, isTopicPending, onMessageSend, onDiscussionStart, onDiscussionSkip, onStopDiscussion, onInputActivate, onResumeTopic, onPlayPause, isDiscussionPaused, onDiscussionPause, onDiscussionResume, currentSceneIndex, scenesCount, whiteboardOpen, sidebarCollapsed, chatCollapsed, onToggleSidebar, onToggleChat, onPrevSlide, onNextSlide, onWhiteboardClose, isPresenting, controlsVisible, onTogglePresentation, onPresentationInteractionChange, fullscreenContainerRef, }: RoundtableProps): import("react/jsx-runtime").JSX.Element;
export {};
