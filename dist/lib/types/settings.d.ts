import { ProviderId, ModelInfo, ProviderType } from './provider';
export type SettingsSection = 'general' | 'providers' | 'agents' | 'tts' | 'asr' | 'pdf' | 'image' | 'video' | 'web-search';
/**
 * Unified provider configuration stored in JSON format
 * Stores all provider-specific settings and metadata in one object
 * Both built-in and custom providers use the same structure
 */
export interface ProviderSettings {
    apiKey: string;
    baseUrl: string;
    models: ModelInfo[];
    name: string;
    type: ProviderType;
    defaultBaseUrl?: string;
    icon?: string;
    requiresApiKey: boolean;
    isBuiltIn: boolean;
    isServerConfigured?: boolean;
    serverModels?: string[];
    serverBaseUrl?: string;
}
/**
 * Provider configurations storage format
 * Key: providerId, Value: ProviderSettings
 */
export type ProvidersConfig = Record<ProviderId, ProviderSettings>;
export interface EditingModel {
    providerId: ProviderId;
    modelIndex: number | null;
    model: ModelInfo;
}
//# sourceMappingURL=settings.d.ts.map