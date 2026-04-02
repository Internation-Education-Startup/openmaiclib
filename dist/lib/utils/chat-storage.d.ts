import { ChatSession } from '../types/chat';
/**
 * Save chat sessions for a stage to IndexedDB.
 * - Active sessions are saved as 'interrupted' (streaming context lost on refresh)
 * - pendingToolCalls are cleared (runtime-only state)
 * - Messages are truncated to MAX_MESSAGES_PER_SESSION
 */
export declare function saveChatSessions(stageId: string, sessions: ChatSession[]): Promise<void>;
/**
 * Load chat sessions for a stage from IndexedDB.
 * Returns sessions sorted by createdAt.
 */
export declare function loadChatSessions(stageId: string): Promise<ChatSession[]>;
/**
 * Delete all chat sessions for a stage.
 */
export declare function deleteChatSessions(stageId: string): Promise<void>;
//# sourceMappingURL=chat-storage.d.ts.map