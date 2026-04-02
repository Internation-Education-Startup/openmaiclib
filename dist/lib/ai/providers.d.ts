import { LanguageModel } from 'ai';
import { ProviderId, ProviderConfig, ModelInfo, ModelConfig } from '../types/provider';
export type { ProviderId, ProviderConfig, ModelInfo, ModelConfig };
/**
 * Provider registry
 */
export declare const PROVIDERS: Record<ProviderId, ProviderConfig>;
/**
 * Model instance with its configuration info
 */
export interface ModelWithInfo {
    model: LanguageModel;
    modelInfo: ModelInfo | null;
}
/**
 * Get a configured language model instance with its info
 * Accepts individual parameters for flexibility and security
 */
export declare function getModel(config: ModelConfig): ModelWithInfo;
/**
 * Parse model string in format "providerId:modelId" or just "modelId" (defaults to OpenAI)
 */
export declare function parseModelString(modelString: string): {
    providerId: ProviderId;
    modelId: string;
};
/**
 * Get all available models grouped by provider
 */
export declare function getAllModels(): {
    provider: ProviderConfig;
    models: ModelInfo[];
}[];
/**
 * Get provider by ID
 */
export declare function getProvider(providerId: ProviderId): ProviderConfig | undefined;
/**
 * Get model info
 */
export declare function getModelInfo(providerId: ProviderId, modelId: string): ModelInfo | undefined;
//# sourceMappingURL=providers.d.ts.map