interface Agent {
    id: string;
    name: string;
    avatar: string;
    role: string;
    priority: number;
    allowedActions: string[];
}
interface AgentSettingsProps {
    agents: Agent[];
    selectedAgentIds: string[];
    maxTurns: string;
    agentMode: 'preset' | 'auto';
    onToggleAgent: (agentId: string) => void;
    onMaxTurnsChange: (value: string) => void;
    onAgentModeChange: (mode: 'preset' | 'auto') => void;
}
export declare function AgentSettings({ agents, selectedAgentIds, maxTurns, agentMode, onToggleAgent, onMaxTurnsChange, onAgentModeChange, }: AgentSettingsProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=agent-settings.d.ts.map