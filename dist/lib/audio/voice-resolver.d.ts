import { TTSProviderId } from './types';
import { AgentConfig } from '../orchestration/registry/types';
export interface ResolvedVoice {
    providerId: TTSProviderId;
    modelId?: string;
    voiceId: string;
}
/**
 * Resolve the TTS provider + voice for an agent.
 * 1. If agent has voiceConfig and the voice is still valid, use it
 * 2. Otherwise, use the first available provider + deterministic voice by index
 */
export declare function resolveAgentVoice(agent: AgentConfig, agentIndex: number, availableProviders: ProviderWithVoices[]): ResolvedVoice;
/**
 * Get the list of voice IDs for a TTS provider.
 * For browser-native-tts, returns empty (browser voices are dynamic).
 */
export declare function getServerVoiceList(providerId: TTSProviderId): string[];
export interface ModelVoiceGroup {
    modelId: string;
    modelName: string;
    voices: Array<{
        id: string;
        name: string;
    }>;
}
export interface ProviderWithVoices {
    providerId: TTSProviderId;
    providerName: string;
    voices: Array<{
        id: string;
        name: string;
    }>;
    modelGroups: ModelVoiceGroup[];
}
/**
 * Get all available providers and their voices for the voice picker UI.
 * A provider is available if it has an API key or is server-configured.
 * Browser-native-tts is excluded (no static voice list).
 */
export declare function getAvailableProvidersWithVoices(ttsProvidersConfig: Record<string, {
    apiKey?: string;
    enabled?: boolean;
    isServerConfigured?: boolean;
}>): ProviderWithVoices[];
/**
 * Find a voice display name across all providers.
 */
export declare function findVoiceDisplayName(providerId: TTSProviderId, voiceId: string): string;
//# sourceMappingURL=voice-resolver.d.ts.map