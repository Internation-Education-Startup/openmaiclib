import { StatelessChatRequest } from '../types/chat';
import { AgentConfig } from './registry/types';
import { WhiteboardActionRecord, AgentTurnSummary } from './director-prompt';
/**
 * Discussion context for agent-initiated discussions
 */
interface DiscussionContext {
    topic: string;
    prompt?: string;
}
/**
 * Build system prompt for structured output generation
 *
 * @param agentConfig - The agent configuration
 * @param storeState - Current application state
 * @param discussionContext - Optional discussion context for agent-initiated discussions
 * @returns System prompt string
 */
export declare function buildStructuredPrompt(agentConfig: AgentConfig, storeState: StatelessChatRequest['storeState'], discussionContext?: DiscussionContext, whiteboardLedger?: WhiteboardActionRecord[], userProfile?: {
    nickname?: string;
    bio?: string;
}, agentResponses?: AgentTurnSummary[]): string;
/**
 * OpenAI message format (used by director)
 */
interface OpenAIMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}
/**
 * Summarize conversation history for the director agent
 *
 * Produces a condensed text summary of the last N messages,
 * truncating long messages and including role labels.
 *
 * @param messages - OpenAI-format messages to summarize
 * @param maxMessages - Maximum number of recent messages to include (default 10)
 * @param maxContentLength - Maximum content length per message (default 200)
 */
export declare function summarizeConversation(messages: OpenAIMessage[], maxMessages?: number, maxContentLength?: number): string;
/**
 * Convert UI messages to OpenAI format
 * Includes tool call information so the model knows what actions were taken
 */
export declare function convertMessagesToOpenAI(messages: StatelessChatRequest['messages'], currentAgentId?: string): Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
}>;
export {};
//# sourceMappingURL=prompt-builder.d.ts.map