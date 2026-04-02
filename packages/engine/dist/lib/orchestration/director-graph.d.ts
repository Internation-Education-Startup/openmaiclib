import { LanguageModel } from 'ai';
import { StatelessChatRequest } from '../types/chat';
import { ThinkingConfig } from '../types/provider';
import { AgentConfig } from './registry/types';
import { AgentTurnSummary, WhiteboardActionRecord } from './director-prompt';
/**
 * LangGraph state annotation for the orchestration graph
 */
declare const OrchestratorState: import('@langchain/langgraph').AnnotationRoot<{
    messages: {
        (annotation: import('@langchain/langgraph').SingleReducer<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[], import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[]>): import('@langchain/langgraph').BaseChannel<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[], import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[] | import('@langchain/langgraph').OverwriteValue<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[]>, unknown>;
        (): import('@langchain/langgraph').LastValue<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[]>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    storeState: {
        (annotation: import('@langchain/langgraph').SingleReducer<{
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        }, {
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        }>): import('@langchain/langgraph').BaseChannel<{
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        }, {
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        } | import('@langchain/langgraph').OverwriteValue<{
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        }>, unknown>;
        (): import('@langchain/langgraph').LastValue<{
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        }>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    availableAgentIds: {
        (annotation: import('@langchain/langgraph').SingleReducer<string[], string[]>): import('@langchain/langgraph').BaseChannel<string[], string[] | import('@langchain/langgraph').OverwriteValue<string[]>, unknown>;
        (): import('@langchain/langgraph').LastValue<string[]>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    maxTurns: {
        (annotation: import('@langchain/langgraph').SingleReducer<number, number>): import('@langchain/langgraph').BaseChannel<number, number | import('@langchain/langgraph').OverwriteValue<number>, unknown>;
        (): import('@langchain/langgraph').LastValue<number>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    languageModel: {
        (annotation: import('@langchain/langgraph').SingleReducer<LanguageModel, LanguageModel>): import('@langchain/langgraph').BaseChannel<LanguageModel, LanguageModel | import('@langchain/langgraph').OverwriteValue<LanguageModel>, unknown>;
        (): import('@langchain/langgraph').LastValue<LanguageModel>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    thinkingConfig: {
        (annotation: import('@langchain/langgraph').SingleReducer<ThinkingConfig, ThinkingConfig>): import('@langchain/langgraph').BaseChannel<ThinkingConfig, ThinkingConfig | import('@langchain/langgraph').OverwriteValue<ThinkingConfig>, unknown>;
        (): import('@langchain/langgraph').LastValue<ThinkingConfig>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    discussionContext: {
        (annotation: import('@langchain/langgraph').SingleReducer<{
            topic: string;
            prompt?: string;
        }, {
            topic: string;
            prompt?: string;
        }>): import('@langchain/langgraph').BaseChannel<{
            topic: string;
            prompt?: string;
        }, {
            topic: string;
            prompt?: string;
        } | import('@langchain/langgraph').OverwriteValue<{
            topic: string;
            prompt?: string;
        }>, unknown>;
        (): import('@langchain/langgraph').LastValue<{
            topic: string;
            prompt?: string;
        }>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    triggerAgentId: {
        (annotation: import('@langchain/langgraph').SingleReducer<string, string>): import('@langchain/langgraph').BaseChannel<string, string | import('@langchain/langgraph').OverwriteValue<string>, unknown>;
        (): import('@langchain/langgraph').LastValue<string>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    userProfile: {
        (annotation: import('@langchain/langgraph').SingleReducer<{
            nickname?: string;
            bio?: string;
        }, {
            nickname?: string;
            bio?: string;
        }>): import('@langchain/langgraph').BaseChannel<{
            nickname?: string;
            bio?: string;
        }, {
            nickname?: string;
            bio?: string;
        } | import('@langchain/langgraph').OverwriteValue<{
            nickname?: string;
            bio?: string;
        }>, unknown>;
        (): import('@langchain/langgraph').LastValue<{
            nickname?: string;
            bio?: string;
        }>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    /** Request-scoped agent configs for generated agents (not in the default registry) */
    agentConfigOverrides: {
        (annotation: import('@langchain/langgraph').SingleReducer<Record<string, AgentConfig>, Record<string, AgentConfig>>): import('@langchain/langgraph').BaseChannel<Record<string, AgentConfig>, Record<string, AgentConfig> | import('@langchain/langgraph').OverwriteValue<Record<string, AgentConfig>>, unknown>;
        (): import('@langchain/langgraph').LastValue<Record<string, AgentConfig>>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    currentAgentId: {
        (annotation: import('@langchain/langgraph').SingleReducer<string, string>): import('@langchain/langgraph').BaseChannel<string, string | import('@langchain/langgraph').OverwriteValue<string>, unknown>;
        (): import('@langchain/langgraph').LastValue<string>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    turnCount: {
        (annotation: import('@langchain/langgraph').SingleReducer<number, number>): import('@langchain/langgraph').BaseChannel<number, number | import('@langchain/langgraph').OverwriteValue<number>, unknown>;
        (): import('@langchain/langgraph').LastValue<number>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    agentResponses: import('@langchain/langgraph').BaseChannel<AgentTurnSummary[], AgentTurnSummary[] | import('@langchain/langgraph').OverwriteValue<AgentTurnSummary[]>, unknown>;
    whiteboardLedger: import('@langchain/langgraph').BaseChannel<WhiteboardActionRecord[], WhiteboardActionRecord[] | import('@langchain/langgraph').OverwriteValue<WhiteboardActionRecord[]>, unknown>;
    shouldEnd: {
        (annotation: import('@langchain/langgraph').SingleReducer<boolean, boolean>): import('@langchain/langgraph').BaseChannel<boolean, boolean | import('@langchain/langgraph').OverwriteValue<boolean>, unknown>;
        (): import('@langchain/langgraph').LastValue<boolean>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    totalActions: {
        (annotation: import('@langchain/langgraph').SingleReducer<number, number>): import('@langchain/langgraph').BaseChannel<number, number | import('@langchain/langgraph').OverwriteValue<number>, unknown>;
        (): import('@langchain/langgraph').LastValue<number>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
}>;
/**
 * Create the orchestration LangGraph StateGraph.
 *
 * Topology:
 *   START → director ──(end)──→ END
 *              │
 *              └─(next)→ agent_generate ──→ director (loop)
 */
export declare function createOrchestrationGraph(): import('@langchain/langgraph').CompiledStateGraph<{
    messages: import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[];
    storeState: {
        stage: import('../../packages/engine').StageType | null;
        scenes: import('../../packages/engine').Scene[];
        currentSceneId: string | null;
        mode: import('../types/stage').StageMode;
        whiteboardOpen: boolean;
    };
    availableAgentIds: string[];
    maxTurns: number;
    languageModel: LanguageModel;
    thinkingConfig: ThinkingConfig;
    discussionContext: {
        topic: string;
        prompt?: string;
    };
    triggerAgentId: string;
    userProfile: {
        nickname?: string;
        bio?: string;
    };
    agentConfigOverrides: Record<string, AgentConfig>;
    currentAgentId: string;
    turnCount: number;
    agentResponses: AgentTurnSummary[];
    whiteboardLedger: WhiteboardActionRecord[];
    shouldEnd: boolean;
    totalActions: number;
}, {
    messages?: import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[];
    storeState?: {
        stage: import('../../packages/engine').StageType | null;
        scenes: import('../../packages/engine').Scene[];
        currentSceneId: string | null;
        mode: import('../types/stage').StageMode;
        whiteboardOpen: boolean;
    };
    availableAgentIds?: string[];
    maxTurns?: number;
    languageModel?: LanguageModel;
    thinkingConfig?: ThinkingConfig;
    discussionContext?: {
        topic: string;
        prompt?: string;
    };
    triggerAgentId?: string;
    userProfile?: {
        nickname?: string;
        bio?: string;
    };
    agentConfigOverrides?: Record<string, AgentConfig>;
    currentAgentId?: string;
    turnCount?: number;
    agentResponses?: AgentTurnSummary[] | import('@langchain/langgraph').OverwriteValue<AgentTurnSummary[]>;
    whiteboardLedger?: WhiteboardActionRecord[] | import('@langchain/langgraph').OverwriteValue<WhiteboardActionRecord[]>;
    shouldEnd?: boolean;
    totalActions?: number;
}, "director" | "agent_generate" | "__start__", {
    messages: {
        (annotation: import('@langchain/langgraph').SingleReducer<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[], import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[]>): import('@langchain/langgraph').BaseChannel<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[], import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[] | import('@langchain/langgraph').OverwriteValue<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[]>, unknown>;
        (): import('@langchain/langgraph').LastValue<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[]>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    storeState: {
        (annotation: import('@langchain/langgraph').SingleReducer<{
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        }, {
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        }>): import('@langchain/langgraph').BaseChannel<{
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        }, {
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        } | import('@langchain/langgraph').OverwriteValue<{
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        }>, unknown>;
        (): import('@langchain/langgraph').LastValue<{
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        }>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    availableAgentIds: {
        (annotation: import('@langchain/langgraph').SingleReducer<string[], string[]>): import('@langchain/langgraph').BaseChannel<string[], string[] | import('@langchain/langgraph').OverwriteValue<string[]>, unknown>;
        (): import('@langchain/langgraph').LastValue<string[]>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    maxTurns: {
        (annotation: import('@langchain/langgraph').SingleReducer<number, number>): import('@langchain/langgraph').BaseChannel<number, number | import('@langchain/langgraph').OverwriteValue<number>, unknown>;
        (): import('@langchain/langgraph').LastValue<number>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    languageModel: {
        (annotation: import('@langchain/langgraph').SingleReducer<LanguageModel, LanguageModel>): import('@langchain/langgraph').BaseChannel<LanguageModel, LanguageModel | import('@langchain/langgraph').OverwriteValue<LanguageModel>, unknown>;
        (): import('@langchain/langgraph').LastValue<LanguageModel>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    thinkingConfig: {
        (annotation: import('@langchain/langgraph').SingleReducer<ThinkingConfig, ThinkingConfig>): import('@langchain/langgraph').BaseChannel<ThinkingConfig, ThinkingConfig | import('@langchain/langgraph').OverwriteValue<ThinkingConfig>, unknown>;
        (): import('@langchain/langgraph').LastValue<ThinkingConfig>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    discussionContext: {
        (annotation: import('@langchain/langgraph').SingleReducer<{
            topic: string;
            prompt?: string;
        }, {
            topic: string;
            prompt?: string;
        }>): import('@langchain/langgraph').BaseChannel<{
            topic: string;
            prompt?: string;
        }, {
            topic: string;
            prompt?: string;
        } | import('@langchain/langgraph').OverwriteValue<{
            topic: string;
            prompt?: string;
        }>, unknown>;
        (): import('@langchain/langgraph').LastValue<{
            topic: string;
            prompt?: string;
        }>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    triggerAgentId: {
        (annotation: import('@langchain/langgraph').SingleReducer<string, string>): import('@langchain/langgraph').BaseChannel<string, string | import('@langchain/langgraph').OverwriteValue<string>, unknown>;
        (): import('@langchain/langgraph').LastValue<string>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    userProfile: {
        (annotation: import('@langchain/langgraph').SingleReducer<{
            nickname?: string;
            bio?: string;
        }, {
            nickname?: string;
            bio?: string;
        }>): import('@langchain/langgraph').BaseChannel<{
            nickname?: string;
            bio?: string;
        }, {
            nickname?: string;
            bio?: string;
        } | import('@langchain/langgraph').OverwriteValue<{
            nickname?: string;
            bio?: string;
        }>, unknown>;
        (): import('@langchain/langgraph').LastValue<{
            nickname?: string;
            bio?: string;
        }>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    /** Request-scoped agent configs for generated agents (not in the default registry) */
    agentConfigOverrides: {
        (annotation: import('@langchain/langgraph').SingleReducer<Record<string, AgentConfig>, Record<string, AgentConfig>>): import('@langchain/langgraph').BaseChannel<Record<string, AgentConfig>, Record<string, AgentConfig> | import('@langchain/langgraph').OverwriteValue<Record<string, AgentConfig>>, unknown>;
        (): import('@langchain/langgraph').LastValue<Record<string, AgentConfig>>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    currentAgentId: {
        (annotation: import('@langchain/langgraph').SingleReducer<string, string>): import('@langchain/langgraph').BaseChannel<string, string | import('@langchain/langgraph').OverwriteValue<string>, unknown>;
        (): import('@langchain/langgraph').LastValue<string>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    turnCount: {
        (annotation: import('@langchain/langgraph').SingleReducer<number, number>): import('@langchain/langgraph').BaseChannel<number, number | import('@langchain/langgraph').OverwriteValue<number>, unknown>;
        (): import('@langchain/langgraph').LastValue<number>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    agentResponses: import('@langchain/langgraph').BaseChannel<AgentTurnSummary[], AgentTurnSummary[] | import('@langchain/langgraph').OverwriteValue<AgentTurnSummary[]>, unknown>;
    whiteboardLedger: import('@langchain/langgraph').BaseChannel<WhiteboardActionRecord[], WhiteboardActionRecord[] | import('@langchain/langgraph').OverwriteValue<WhiteboardActionRecord[]>, unknown>;
    shouldEnd: {
        (annotation: import('@langchain/langgraph').SingleReducer<boolean, boolean>): import('@langchain/langgraph').BaseChannel<boolean, boolean | import('@langchain/langgraph').OverwriteValue<boolean>, unknown>;
        (): import('@langchain/langgraph').LastValue<boolean>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    totalActions: {
        (annotation: import('@langchain/langgraph').SingleReducer<number, number>): import('@langchain/langgraph').BaseChannel<number, number | import('@langchain/langgraph').OverwriteValue<number>, unknown>;
        (): import('@langchain/langgraph').LastValue<number>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
}, {
    messages: {
        (annotation: import('@langchain/langgraph').SingleReducer<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[], import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[]>): import('@langchain/langgraph').BaseChannel<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[], import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[] | import('@langchain/langgraph').OverwriteValue<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[]>, unknown>;
        (): import('@langchain/langgraph').LastValue<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[]>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    storeState: {
        (annotation: import('@langchain/langgraph').SingleReducer<{
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        }, {
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        }>): import('@langchain/langgraph').BaseChannel<{
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        }, {
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        } | import('@langchain/langgraph').OverwriteValue<{
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        }>, unknown>;
        (): import('@langchain/langgraph').LastValue<{
            stage: import('../../packages/engine').StageType | null;
            scenes: import('../../packages/engine').Scene[];
            currentSceneId: string | null;
            mode: import('../types/stage').StageMode;
            whiteboardOpen: boolean;
        }>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    availableAgentIds: {
        (annotation: import('@langchain/langgraph').SingleReducer<string[], string[]>): import('@langchain/langgraph').BaseChannel<string[], string[] | import('@langchain/langgraph').OverwriteValue<string[]>, unknown>;
        (): import('@langchain/langgraph').LastValue<string[]>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    maxTurns: {
        (annotation: import('@langchain/langgraph').SingleReducer<number, number>): import('@langchain/langgraph').BaseChannel<number, number | import('@langchain/langgraph').OverwriteValue<number>, unknown>;
        (): import('@langchain/langgraph').LastValue<number>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    languageModel: {
        (annotation: import('@langchain/langgraph').SingleReducer<LanguageModel, LanguageModel>): import('@langchain/langgraph').BaseChannel<LanguageModel, LanguageModel | import('@langchain/langgraph').OverwriteValue<LanguageModel>, unknown>;
        (): import('@langchain/langgraph').LastValue<LanguageModel>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    thinkingConfig: {
        (annotation: import('@langchain/langgraph').SingleReducer<ThinkingConfig, ThinkingConfig>): import('@langchain/langgraph').BaseChannel<ThinkingConfig, ThinkingConfig | import('@langchain/langgraph').OverwriteValue<ThinkingConfig>, unknown>;
        (): import('@langchain/langgraph').LastValue<ThinkingConfig>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    discussionContext: {
        (annotation: import('@langchain/langgraph').SingleReducer<{
            topic: string;
            prompt?: string;
        }, {
            topic: string;
            prompt?: string;
        }>): import('@langchain/langgraph').BaseChannel<{
            topic: string;
            prompt?: string;
        }, {
            topic: string;
            prompt?: string;
        } | import('@langchain/langgraph').OverwriteValue<{
            topic: string;
            prompt?: string;
        }>, unknown>;
        (): import('@langchain/langgraph').LastValue<{
            topic: string;
            prompt?: string;
        }>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    triggerAgentId: {
        (annotation: import('@langchain/langgraph').SingleReducer<string, string>): import('@langchain/langgraph').BaseChannel<string, string | import('@langchain/langgraph').OverwriteValue<string>, unknown>;
        (): import('@langchain/langgraph').LastValue<string>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    userProfile: {
        (annotation: import('@langchain/langgraph').SingleReducer<{
            nickname?: string;
            bio?: string;
        }, {
            nickname?: string;
            bio?: string;
        }>): import('@langchain/langgraph').BaseChannel<{
            nickname?: string;
            bio?: string;
        }, {
            nickname?: string;
            bio?: string;
        } | import('@langchain/langgraph').OverwriteValue<{
            nickname?: string;
            bio?: string;
        }>, unknown>;
        (): import('@langchain/langgraph').LastValue<{
            nickname?: string;
            bio?: string;
        }>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    /** Request-scoped agent configs for generated agents (not in the default registry) */
    agentConfigOverrides: {
        (annotation: import('@langchain/langgraph').SingleReducer<Record<string, AgentConfig>, Record<string, AgentConfig>>): import('@langchain/langgraph').BaseChannel<Record<string, AgentConfig>, Record<string, AgentConfig> | import('@langchain/langgraph').OverwriteValue<Record<string, AgentConfig>>, unknown>;
        (): import('@langchain/langgraph').LastValue<Record<string, AgentConfig>>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    currentAgentId: {
        (annotation: import('@langchain/langgraph').SingleReducer<string, string>): import('@langchain/langgraph').BaseChannel<string, string | import('@langchain/langgraph').OverwriteValue<string>, unknown>;
        (): import('@langchain/langgraph').LastValue<string>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    turnCount: {
        (annotation: import('@langchain/langgraph').SingleReducer<number, number>): import('@langchain/langgraph').BaseChannel<number, number | import('@langchain/langgraph').OverwriteValue<number>, unknown>;
        (): import('@langchain/langgraph').LastValue<number>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    agentResponses: import('@langchain/langgraph').BaseChannel<AgentTurnSummary[], AgentTurnSummary[] | import('@langchain/langgraph').OverwriteValue<AgentTurnSummary[]>, unknown>;
    whiteboardLedger: import('@langchain/langgraph').BaseChannel<WhiteboardActionRecord[], WhiteboardActionRecord[] | import('@langchain/langgraph').OverwriteValue<WhiteboardActionRecord[]>, unknown>;
    shouldEnd: {
        (annotation: import('@langchain/langgraph').SingleReducer<boolean, boolean>): import('@langchain/langgraph').BaseChannel<boolean, boolean | import('@langchain/langgraph').OverwriteValue<boolean>, unknown>;
        (): import('@langchain/langgraph').LastValue<boolean>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
    totalActions: {
        (annotation: import('@langchain/langgraph').SingleReducer<number, number>): import('@langchain/langgraph').BaseChannel<number, number | import('@langchain/langgraph').OverwriteValue<number>, unknown>;
        (): import('@langchain/langgraph').LastValue<number>;
        Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
    };
}, import('@langchain/langgraph').StateDefinition, {
    director: Partial<import('@langchain/langgraph').StateType<{
        messages: {
            (annotation: import('@langchain/langgraph').SingleReducer<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[], import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[]>): import('@langchain/langgraph').BaseChannel<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[], import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[] | import('@langchain/langgraph').OverwriteValue<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[]>, unknown>;
            (): import('@langchain/langgraph').LastValue<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[]>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        storeState: {
            (annotation: import('@langchain/langgraph').SingleReducer<{
                stage: import('../../packages/engine').StageType | null;
                scenes: import('../../packages/engine').Scene[];
                currentSceneId: string | null;
                mode: import('../types/stage').StageMode;
                whiteboardOpen: boolean;
            }, {
                stage: import('../../packages/engine').StageType | null;
                scenes: import('../../packages/engine').Scene[];
                currentSceneId: string | null;
                mode: import('../types/stage').StageMode;
                whiteboardOpen: boolean;
            }>): import('@langchain/langgraph').BaseChannel<{
                stage: import('../../packages/engine').StageType | null;
                scenes: import('../../packages/engine').Scene[];
                currentSceneId: string | null;
                mode: import('../types/stage').StageMode;
                whiteboardOpen: boolean;
            }, {
                stage: import('../../packages/engine').StageType | null;
                scenes: import('../../packages/engine').Scene[];
                currentSceneId: string | null;
                mode: import('../types/stage').StageMode;
                whiteboardOpen: boolean;
            } | import('@langchain/langgraph').OverwriteValue<{
                stage: import('../../packages/engine').StageType | null;
                scenes: import('../../packages/engine').Scene[];
                currentSceneId: string | null;
                mode: import('../types/stage').StageMode;
                whiteboardOpen: boolean;
            }>, unknown>;
            (): import('@langchain/langgraph').LastValue<{
                stage: import('../../packages/engine').StageType | null;
                scenes: import('../../packages/engine').Scene[];
                currentSceneId: string | null;
                mode: import('../types/stage').StageMode;
                whiteboardOpen: boolean;
            }>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        availableAgentIds: {
            (annotation: import('@langchain/langgraph').SingleReducer<string[], string[]>): import('@langchain/langgraph').BaseChannel<string[], string[] | import('@langchain/langgraph').OverwriteValue<string[]>, unknown>;
            (): import('@langchain/langgraph').LastValue<string[]>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        maxTurns: {
            (annotation: import('@langchain/langgraph').SingleReducer<number, number>): import('@langchain/langgraph').BaseChannel<number, number | import('@langchain/langgraph').OverwriteValue<number>, unknown>;
            (): import('@langchain/langgraph').LastValue<number>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        languageModel: {
            (annotation: import('@langchain/langgraph').SingleReducer<LanguageModel, LanguageModel>): import('@langchain/langgraph').BaseChannel<LanguageModel, LanguageModel | import('@langchain/langgraph').OverwriteValue<LanguageModel>, unknown>;
            (): import('@langchain/langgraph').LastValue<LanguageModel>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        thinkingConfig: {
            (annotation: import('@langchain/langgraph').SingleReducer<ThinkingConfig, ThinkingConfig>): import('@langchain/langgraph').BaseChannel<ThinkingConfig, ThinkingConfig | import('@langchain/langgraph').OverwriteValue<ThinkingConfig>, unknown>;
            (): import('@langchain/langgraph').LastValue<ThinkingConfig>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        discussionContext: {
            (annotation: import('@langchain/langgraph').SingleReducer<{
                topic: string;
                prompt?: string;
            }, {
                topic: string;
                prompt?: string;
            }>): import('@langchain/langgraph').BaseChannel<{
                topic: string;
                prompt?: string;
            }, {
                topic: string;
                prompt?: string;
            } | import('@langchain/langgraph').OverwriteValue<{
                topic: string;
                prompt?: string;
            }>, unknown>;
            (): import('@langchain/langgraph').LastValue<{
                topic: string;
                prompt?: string;
            }>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        triggerAgentId: {
            (annotation: import('@langchain/langgraph').SingleReducer<string, string>): import('@langchain/langgraph').BaseChannel<string, string | import('@langchain/langgraph').OverwriteValue<string>, unknown>;
            (): import('@langchain/langgraph').LastValue<string>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        userProfile: {
            (annotation: import('@langchain/langgraph').SingleReducer<{
                nickname?: string;
                bio?: string;
            }, {
                nickname?: string;
                bio?: string;
            }>): import('@langchain/langgraph').BaseChannel<{
                nickname?: string;
                bio?: string;
            }, {
                nickname?: string;
                bio?: string;
            } | import('@langchain/langgraph').OverwriteValue<{
                nickname?: string;
                bio?: string;
            }>, unknown>;
            (): import('@langchain/langgraph').LastValue<{
                nickname?: string;
                bio?: string;
            }>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        /** Request-scoped agent configs for generated agents (not in the default registry) */
        agentConfigOverrides: {
            (annotation: import('@langchain/langgraph').SingleReducer<Record<string, AgentConfig>, Record<string, AgentConfig>>): import('@langchain/langgraph').BaseChannel<Record<string, AgentConfig>, Record<string, AgentConfig> | import('@langchain/langgraph').OverwriteValue<Record<string, AgentConfig>>, unknown>;
            (): import('@langchain/langgraph').LastValue<Record<string, AgentConfig>>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        currentAgentId: {
            (annotation: import('@langchain/langgraph').SingleReducer<string, string>): import('@langchain/langgraph').BaseChannel<string, string | import('@langchain/langgraph').OverwriteValue<string>, unknown>;
            (): import('@langchain/langgraph').LastValue<string>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        turnCount: {
            (annotation: import('@langchain/langgraph').SingleReducer<number, number>): import('@langchain/langgraph').BaseChannel<number, number | import('@langchain/langgraph').OverwriteValue<number>, unknown>;
            (): import('@langchain/langgraph').LastValue<number>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        agentResponses: import('@langchain/langgraph').BaseChannel<AgentTurnSummary[], AgentTurnSummary[] | import('@langchain/langgraph').OverwriteValue<AgentTurnSummary[]>, unknown>;
        whiteboardLedger: import('@langchain/langgraph').BaseChannel<WhiteboardActionRecord[], WhiteboardActionRecord[] | import('@langchain/langgraph').OverwriteValue<WhiteboardActionRecord[]>, unknown>;
        shouldEnd: {
            (annotation: import('@langchain/langgraph').SingleReducer<boolean, boolean>): import('@langchain/langgraph').BaseChannel<boolean, boolean | import('@langchain/langgraph').OverwriteValue<boolean>, unknown>;
            (): import('@langchain/langgraph').LastValue<boolean>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        totalActions: {
            (annotation: import('@langchain/langgraph').SingleReducer<number, number>): import('@langchain/langgraph').BaseChannel<number, number | import('@langchain/langgraph').OverwriteValue<number>, unknown>;
            (): import('@langchain/langgraph').LastValue<number>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
    }>>;
    agent_generate: Partial<import('@langchain/langgraph').StateType<{
        messages: {
            (annotation: import('@langchain/langgraph').SingleReducer<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[], import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[]>): import('@langchain/langgraph').BaseChannel<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[], import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[] | import('@langchain/langgraph').OverwriteValue<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[]>, unknown>;
            (): import('@langchain/langgraph').LastValue<import('ai').UIMessage<import('../types/chat').ChatMessageMetadata, import('ai').UIDataTypes, import('ai').UITools>[]>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        storeState: {
            (annotation: import('@langchain/langgraph').SingleReducer<{
                stage: import('../../packages/engine').StageType | null;
                scenes: import('../../packages/engine').Scene[];
                currentSceneId: string | null;
                mode: import('../types/stage').StageMode;
                whiteboardOpen: boolean;
            }, {
                stage: import('../../packages/engine').StageType | null;
                scenes: import('../../packages/engine').Scene[];
                currentSceneId: string | null;
                mode: import('../types/stage').StageMode;
                whiteboardOpen: boolean;
            }>): import('@langchain/langgraph').BaseChannel<{
                stage: import('../../packages/engine').StageType | null;
                scenes: import('../../packages/engine').Scene[];
                currentSceneId: string | null;
                mode: import('../types/stage').StageMode;
                whiteboardOpen: boolean;
            }, {
                stage: import('../../packages/engine').StageType | null;
                scenes: import('../../packages/engine').Scene[];
                currentSceneId: string | null;
                mode: import('../types/stage').StageMode;
                whiteboardOpen: boolean;
            } | import('@langchain/langgraph').OverwriteValue<{
                stage: import('../../packages/engine').StageType | null;
                scenes: import('../../packages/engine').Scene[];
                currentSceneId: string | null;
                mode: import('../types/stage').StageMode;
                whiteboardOpen: boolean;
            }>, unknown>;
            (): import('@langchain/langgraph').LastValue<{
                stage: import('../../packages/engine').StageType | null;
                scenes: import('../../packages/engine').Scene[];
                currentSceneId: string | null;
                mode: import('../types/stage').StageMode;
                whiteboardOpen: boolean;
            }>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        availableAgentIds: {
            (annotation: import('@langchain/langgraph').SingleReducer<string[], string[]>): import('@langchain/langgraph').BaseChannel<string[], string[] | import('@langchain/langgraph').OverwriteValue<string[]>, unknown>;
            (): import('@langchain/langgraph').LastValue<string[]>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        maxTurns: {
            (annotation: import('@langchain/langgraph').SingleReducer<number, number>): import('@langchain/langgraph').BaseChannel<number, number | import('@langchain/langgraph').OverwriteValue<number>, unknown>;
            (): import('@langchain/langgraph').LastValue<number>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        languageModel: {
            (annotation: import('@langchain/langgraph').SingleReducer<LanguageModel, LanguageModel>): import('@langchain/langgraph').BaseChannel<LanguageModel, LanguageModel | import('@langchain/langgraph').OverwriteValue<LanguageModel>, unknown>;
            (): import('@langchain/langgraph').LastValue<LanguageModel>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        thinkingConfig: {
            (annotation: import('@langchain/langgraph').SingleReducer<ThinkingConfig, ThinkingConfig>): import('@langchain/langgraph').BaseChannel<ThinkingConfig, ThinkingConfig | import('@langchain/langgraph').OverwriteValue<ThinkingConfig>, unknown>;
            (): import('@langchain/langgraph').LastValue<ThinkingConfig>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        discussionContext: {
            (annotation: import('@langchain/langgraph').SingleReducer<{
                topic: string;
                prompt?: string;
            }, {
                topic: string;
                prompt?: string;
            }>): import('@langchain/langgraph').BaseChannel<{
                topic: string;
                prompt?: string;
            }, {
                topic: string;
                prompt?: string;
            } | import('@langchain/langgraph').OverwriteValue<{
                topic: string;
                prompt?: string;
            }>, unknown>;
            (): import('@langchain/langgraph').LastValue<{
                topic: string;
                prompt?: string;
            }>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        triggerAgentId: {
            (annotation: import('@langchain/langgraph').SingleReducer<string, string>): import('@langchain/langgraph').BaseChannel<string, string | import('@langchain/langgraph').OverwriteValue<string>, unknown>;
            (): import('@langchain/langgraph').LastValue<string>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        userProfile: {
            (annotation: import('@langchain/langgraph').SingleReducer<{
                nickname?: string;
                bio?: string;
            }, {
                nickname?: string;
                bio?: string;
            }>): import('@langchain/langgraph').BaseChannel<{
                nickname?: string;
                bio?: string;
            }, {
                nickname?: string;
                bio?: string;
            } | import('@langchain/langgraph').OverwriteValue<{
                nickname?: string;
                bio?: string;
            }>, unknown>;
            (): import('@langchain/langgraph').LastValue<{
                nickname?: string;
                bio?: string;
            }>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        /** Request-scoped agent configs for generated agents (not in the default registry) */
        agentConfigOverrides: {
            (annotation: import('@langchain/langgraph').SingleReducer<Record<string, AgentConfig>, Record<string, AgentConfig>>): import('@langchain/langgraph').BaseChannel<Record<string, AgentConfig>, Record<string, AgentConfig> | import('@langchain/langgraph').OverwriteValue<Record<string, AgentConfig>>, unknown>;
            (): import('@langchain/langgraph').LastValue<Record<string, AgentConfig>>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        currentAgentId: {
            (annotation: import('@langchain/langgraph').SingleReducer<string, string>): import('@langchain/langgraph').BaseChannel<string, string | import('@langchain/langgraph').OverwriteValue<string>, unknown>;
            (): import('@langchain/langgraph').LastValue<string>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        turnCount: {
            (annotation: import('@langchain/langgraph').SingleReducer<number, number>): import('@langchain/langgraph').BaseChannel<number, number | import('@langchain/langgraph').OverwriteValue<number>, unknown>;
            (): import('@langchain/langgraph').LastValue<number>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        agentResponses: import('@langchain/langgraph').BaseChannel<AgentTurnSummary[], AgentTurnSummary[] | import('@langchain/langgraph').OverwriteValue<AgentTurnSummary[]>, unknown>;
        whiteboardLedger: import('@langchain/langgraph').BaseChannel<WhiteboardActionRecord[], WhiteboardActionRecord[] | import('@langchain/langgraph').OverwriteValue<WhiteboardActionRecord[]>, unknown>;
        shouldEnd: {
            (annotation: import('@langchain/langgraph').SingleReducer<boolean, boolean>): import('@langchain/langgraph').BaseChannel<boolean, boolean | import('@langchain/langgraph').OverwriteValue<boolean>, unknown>;
            (): import('@langchain/langgraph').LastValue<boolean>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
        totalActions: {
            (annotation: import('@langchain/langgraph').SingleReducer<number, number>): import('@langchain/langgraph').BaseChannel<number, number | import('@langchain/langgraph').OverwriteValue<number>, unknown>;
            (): import('@langchain/langgraph').LastValue<number>;
            Root: <S extends import('@langchain/langgraph').StateDefinition>(sd: S) => import('@langchain/langgraph').AnnotationRoot<S>;
        };
    }>>;
}, unknown, unknown>;
/**
 * Build initial state for the orchestration graph from a StatelessChatRequest
 * and a pre-created LanguageModel instance.
 */
export declare function buildInitialState(request: StatelessChatRequest, languageModel: LanguageModel, thinkingConfig?: ThinkingConfig): typeof OrchestratorState.State;
export {};
