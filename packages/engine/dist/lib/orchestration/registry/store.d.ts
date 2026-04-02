import { AgentConfig } from './types';
import { Participant } from '../../types/roundtable';
import { AgentInfo } from '../../generation/pipeline-types';
interface AgentRegistryState {
    agents: Record<string, AgentConfig>;
    addAgent: (agent: AgentConfig) => void;
    updateAgent: (id: string, updates: Partial<AgentConfig>) => void;
    deleteAgent: (id: string) => void;
    getAgent: (id: string) => AgentConfig | undefined;
    listAgents: () => AgentConfig[];
}
/**
 * Return the built-in default agents as lightweight AgentInfo objects
 * suitable for the generation pipeline (no UI-only fields like avatar/color).
 */
export declare function getDefaultAgents(): AgentInfo[];
export declare const useAgentRegistry: import('zustand').UseBoundStore<Omit<import('zustand').StoreApi<AgentRegistryState>, "setState" | "persist"> & {
    setState(partial: AgentRegistryState | Partial<AgentRegistryState> | ((state: AgentRegistryState) => AgentRegistryState | Partial<AgentRegistryState>), replace?: false): unknown;
    setState(state: AgentRegistryState | ((state: AgentRegistryState) => AgentRegistryState), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import('zustand/middleware').PersistOptions<AgentRegistryState, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AgentRegistryState) => void) => () => void;
        onFinishHydration: (fn: (state: AgentRegistryState) => void) => () => void;
        getOptions: () => Partial<import('zustand/middleware').PersistOptions<AgentRegistryState, unknown, unknown>>;
    };
}>;
/**
 * Convert agents to roundtable participants
 * Maps agent roles to participant roles for the UI
 * @param t - i18n translation function for localized display names
 */
export declare function agentsToParticipants(agentIds: string[], t?: (key: string) => string): Participant[];
/**
 * Load generated agents for a stage from IndexedDB into the registry.
 * Clears any previously loaded generated agents first.
 * Returns the loaded agent IDs.
 */
export declare function loadGeneratedAgentsForStage(stageId: string): Promise<string[]>;
/**
 * Save generated agents to IndexedDB and registry.
 * Clears old generated agents for this stage first.
 */
export declare function saveGeneratedAgents(stageId: string, agents: Array<{
    id: string;
    name: string;
    role: string;
    persona: string;
    avatar: string;
    color: string;
    priority: number;
    voiceConfig?: {
        providerId: string;
        voiceId: string;
    };
}>): Promise<string[]>;
export {};
