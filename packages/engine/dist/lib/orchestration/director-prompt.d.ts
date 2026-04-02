import { AgentConfig } from './registry/types';
/**
 * A single whiteboard action performed by an agent, recorded in the ledger.
 */
export interface WhiteboardActionRecord {
    actionName: 'wb_draw_text' | 'wb_draw_shape' | 'wb_draw_chart' | 'wb_draw_latex' | 'wb_draw_table' | 'wb_draw_line' | 'wb_clear' | 'wb_delete' | 'wb_open' | 'wb_close';
    agentId: string;
    agentName: string;
    params: Record<string, unknown>;
}
/**
 * Summary of an agent's turn in the current round
 */
export interface AgentTurnSummary {
    agentId: string;
    agentName: string;
    contentPreview: string;
    actionCount: number;
    whiteboardActions: WhiteboardActionRecord[];
}
/**
 * Build the system prompt for the director agent
 *
 * @param agents - Available agent configurations
 * @param conversationSummary - Condensed summary of recent conversation
 * @param agentResponses - Agents that have already responded this round
 * @param turnCount - Current turn number in this round
 */
export declare function buildDirectorPrompt(agents: AgentConfig[], conversationSummary: string, agentResponses: AgentTurnSummary[], turnCount: number, discussionContext?: {
    topic: string;
    prompt?: string;
} | null, triggerAgentId?: string | null, whiteboardLedger?: WhiteboardActionRecord[], userProfile?: {
    nickname?: string;
    bio?: string;
}, whiteboardOpen?: boolean): string;
/**
 * Replay the whiteboard ledger to compute current element count and contributors.
 */
export declare function summarizeWhiteboardForDirector(ledger: WhiteboardActionRecord[]): {
    elementCount: number;
    contributors: string[];
};
/**
 * Parse the director's decision from its response
 *
 * @param content - Raw LLM response content
 * @returns Parsed decision with nextAgentId and shouldEnd flag
 */
export declare function parseDirectorDecision(content: string): {
    nextAgentId: string | null;
    shouldEnd: boolean;
};
