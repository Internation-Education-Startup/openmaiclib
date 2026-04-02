import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { BaseMessage } from '@langchain/core/messages';
import { CallbackManagerForLLMRun } from '@langchain/core/callbacks/manager';
import { ChatResult } from '@langchain/core/outputs';
import { LanguageModel } from 'ai';
import { ThinkingConfig } from '../types/provider';
/**
 * Stream chunk types for streaming generation
 */
export type StreamChunk = {
    type: 'delta';
    content: string;
} | {
    type: 'tool_calls';
    toolCalls: {
        id: string;
        index: number;
        type: 'function';
        function: {
            name: string;
            arguments: string;
        };
    }[];
} | {
    type: 'done';
    content: string;
};
/**
 * Adapter to use any AI SDK LanguageModel with LangGraph
 *
 * Accepts a LanguageModel instance (from getModel()) instead of raw
 * API credentials, enabling support for all providers.
 */
export declare class AISdkLangGraphAdapter extends BaseChatModel {
    private languageModel;
    private thinking?;
    constructor(languageModel: LanguageModel, thinking?: ThinkingConfig);
    _llmType(): string;
    _combineLLMOutput(): {};
    /**
     * Convert LangChain messages to AI SDK message format
     */
    private convertMessages;
    _generate(messages: BaseMessage[], _options?: this['ParsedCallOptions'], _runManager?: CallbackManagerForLLMRun): Promise<ChatResult>;
    /**
     * Stream generate with text deltas
     *
     * Yields chunks of text as they arrive, then yields done with full content.
     * Uses streamLLM which goes through Vercel AI SDK's streamText.
     */
    streamGenerate(messages: BaseMessage[], options?: {
        tools?: Record<string, unknown>;
        signal?: AbortSignal;
    }): AsyncGenerator<StreamChunk>;
}
//# sourceMappingURL=ai-sdk-adapter.d.ts.map