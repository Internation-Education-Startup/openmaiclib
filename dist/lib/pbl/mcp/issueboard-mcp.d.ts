import { PBLProjectConfig, PBLToolResult } from '../types';
import { AgentMCP } from './agent-mcp';
export declare class IssueboardMCP {
    private config;
    private agentMCP;
    private language;
    private nextIssueId;
    constructor(config: PBLProjectConfig, agentMCP: AgentMCP, language?: string);
    createIssueboard(): PBLToolResult;
    getIssueboard(): PBLToolResult;
    updateIssueboardAgents(agentIds: string[]): PBLToolResult;
    createIssue(params: {
        title: string;
        description: string;
        person_in_charge: string;
        participants?: string[];
        notes?: string;
        parent_issue?: string | null;
        index?: number;
    }): PBLToolResult;
    listIssues(): PBLToolResult;
    getIssue(issueId: string): PBLToolResult;
    updateIssue(params: {
        issue_id: string;
        title?: string;
        description?: string;
        person_in_charge?: string;
        participants?: string[];
        notes?: string;
        parent_issue?: string | null;
        index?: number;
    }): PBLToolResult;
    deleteIssue(issueId: string): PBLToolResult;
    reorderIssues(issueIds: string[]): PBLToolResult;
    activateNextIssue(): PBLToolResult;
    completeCurrentIssue(): PBLToolResult;
}
//# sourceMappingURL=issueboard-mcp.d.ts.map