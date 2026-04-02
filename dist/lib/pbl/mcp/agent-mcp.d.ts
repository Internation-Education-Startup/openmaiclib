import { PBLProjectConfig, PBLRoleDivision, PBLToolResult } from '../types';
export declare class AgentMCP {
    private config;
    constructor(config: PBLProjectConfig);
    listAgents(): PBLToolResult;
    getAgentInfo(name: string): PBLToolResult;
    createAgent(params: {
        name: string;
        system_prompt: string;
        default_mode: string;
        delay_time?: number;
        actor_role?: string;
        role_division?: PBLRoleDivision;
        is_system_agent?: boolean;
    }): PBLToolResult;
    updateAgent(params: {
        name: string;
        new_name?: string;
        system_prompt?: string;
        default_mode?: string;
        delay_time?: number;
        actor_role?: string;
        role_division?: PBLRoleDivision;
    }): PBLToolResult;
    deleteAgent(name: string): PBLToolResult;
}
//# sourceMappingURL=agent-mcp.d.ts.map