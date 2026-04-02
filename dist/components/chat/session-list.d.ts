import { ChatSession } from '../../lib/types/chat';
interface SessionListProps {
    sessions: ChatSession[];
    expandedSessionIds: Set<string>;
    isStreaming: boolean;
    activeBubbleId?: string | null;
    onToggleExpand: (sessionId: string) => void;
    onEndSession: (sessionId: string) => Promise<void>;
}
export declare function SessionList({ sessions, expandedSessionIds, isStreaming, activeBubbleId, onToggleExpand, onEndSession, }: SessionListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=session-list.d.ts.map