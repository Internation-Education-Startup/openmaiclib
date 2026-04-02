import { AudioIndicatorState } from './audio-indicator';
import { PlaybackView } from '../../lib/playback';
import { Participant } from '../../lib/types/roundtable';
interface PresentationSpeechOverlayProps {
    readonly playbackView: PlaybackView;
    readonly participants: Participant[];
    readonly speakingAgentId: string | null;
    readonly isTopicPending: boolean;
    readonly userAvatar?: string;
    /** Which side this overlay instance renders — 'left' or 'right' */
    readonly side?: 'left' | 'right';
    readonly onBubbleClick?: () => void;
    readonly audioIndicatorState?: AudioIndicatorState;
    readonly buttonState?: 'play' | 'bars' | 'restart' | 'none';
    readonly isPaused?: boolean;
}
export interface PresentationBubbleModel {
    key: string;
    role: 'teacher' | 'agent' | 'user';
    side: 'left' | 'right';
    name: string;
    avatar: string;
    text: string;
    isLoading: boolean;
    isTopicPending: boolean;
}
export declare function buildPresentationBubbleModel({ playbackView, participants, speakingAgentId, isTopicPending, fallbackTeacherName, fallbackStudentName, fallbackUserName, userAvatar, }: {
    playbackView: PlaybackView;
    participants: Participant[];
    speakingAgentId: string | null;
    isTopicPending: boolean;
    fallbackTeacherName: string;
    fallbackStudentName: string;
    fallbackUserName: string;
    userAvatar?: string;
}): PresentationBubbleModel | null;
/** Reusable bubble card — renders the speech bubble content (avatar, name, text) */
export declare function PresentationBubbleCard({ bubble, onClick, onCollapse, audioIndicatorState, buttonState, isPaused, }: {
    readonly bubble: PresentationBubbleModel;
    readonly onClick?: () => void;
    readonly onCollapse?: () => void;
    readonly audioIndicatorState?: AudioIndicatorState;
    readonly buttonState?: 'play' | 'bars' | 'restart' | 'none';
    readonly isPaused?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export declare function PresentationSpeechOverlay({ playbackView, participants, speakingAgentId, isTopicPending, userAvatar, side, onBubbleClick, audioIndicatorState, buttonState, isPaused, }: PresentationSpeechOverlayProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=presentation-speech-overlay.d.ts.map