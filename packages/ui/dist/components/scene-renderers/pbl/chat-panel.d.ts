import { PBLChatMessage, PBLIssue } from '../../../lib/pbl/types';
interface ChatPanelProps {
    readonly messages: PBLChatMessage[];
    readonly currentIssue: PBLIssue | null;
    readonly userRole: string;
    readonly isLoading: boolean;
    readonly onSendMessage: (text: string) => void;
}
export declare function ChatPanel({ messages, currentIssue, userRole, isLoading, onSendMessage, }: ChatPanelProps): import("react/jsx-runtime").JSX.Element;
export {};
