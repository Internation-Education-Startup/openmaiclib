import { TTSProviderId } from '../../audio/types';
export interface AgentConfig {
    id: string;
    name: string;
    role: string;
    persona: string;
    avatar: string;
    color: string;
    allowedActions: string[];
    priority: number;
    voiceConfig?: {
        providerId: TTSProviderId;
        modelId?: string;
        voiceId: string;
    };
    createdAt: Date;
    updatedAt: Date;
    isDefault: boolean;
    isGenerated?: boolean;
    boundStageId?: string;
}
export interface AgentTemplate {
    name: string;
    role: string;
    persona: string;
    avatar: string;
    color: string;
    allowedActions: string[];
    priority: number;
    voiceConfig?: {
        providerId: TTSProviderId;
        modelId?: string;
        voiceId: string;
    };
    isGenerated?: boolean;
    boundStageId?: string;
}
/**
 * Create a new AgentConfig from a template
 */
export declare function createAgentFromTemplate(template: AgentTemplate, id: string): AgentConfig;
export declare const WHITEBOARD_ACTIONS: string[];
export declare const SLIDE_ACTIONS: string[];
/**
 * Maps agent roles to their allowed action sets.
 * Teachers get slide + whiteboard control; others get whiteboard only.
 */
export declare const ROLE_ACTIONS: Record<string, string[]>;
/**
 * Get the default allowed actions for a given role.
 * Falls back to whiteboard-only actions for unknown roles.
 */
export declare function getActionsForRole(role: string): string[];
