import { ChatSession } from '../../lib/types/chat';
interface ChatSessionProps {
    readonly session: ChatSession;
    readonly isActive: boolean;
    readonly isStreaming?: boolean;
    readonly activeBubbleId?: string | null;
    readonly onEndSession?: (sessionId: string) => void;
}
export declare function ChatSessionComponent({ session, isActive, isStreaming, activeBubbleId, onEndSession, }: ChatSessionProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=chat-session.d.ts.map