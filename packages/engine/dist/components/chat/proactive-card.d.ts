import { DiscussionAction } from '../../lib/types/action';
interface ProactiveCardProps {
    action: DiscussionAction;
    mode: 'playback' | 'paused' | 'autonomous';
    /** Ref to the anchor element the card points to (avatar, etc.) */
    anchorRef: React.RefObject<HTMLElement | null>;
    /** Where the card prefers to align relative to the anchor */
    align?: 'left' | 'right';
    /** Portal target — defaults to document.body. Pass the fullscreen container
     *  when in presentation mode so the card stays visible inside the top-layer. */
    portalContainer?: HTMLElement | null;
    agentName?: string;
    agentAvatar?: string;
    agentColor?: string;
    onSkip: () => void;
    onListen: () => void;
    onTogglePause: () => void;
}
/**
 * 主动讨论卡片组件
 *
 * 通过 React Portal 渲染到 document.body，使用 fixed 定位，
 * 不受父级 overflow/z-index stacking context 影响。
 */
export declare const ProactiveCard: ({ action, mode, anchorRef, align, portalContainer, agentName, agentAvatar, agentColor, onSkip, onListen, onTogglePause, }: ProactiveCardProps) => import('react').ReactPortal;
export {};
