import { ProviderId } from '../ai/providers';
import { ProvidersConfig } from '../types/settings';
import { TTSProviderId, ASRProviderId } from '../audio/types';
import { PDFProviderId } from '../pdf/types';
import { ImageProviderId, VideoProviderId } from '../media/types';
import { WebSearchProviderId } from '../web-search/types';
/** Available playback speed tiers */
export declare const PLAYBACK_SPEEDS: readonly [1, 1.25, 1.5, 2];
export type PlaybackSpeed = (typeof PLAYBACK_SPEEDS)[number];
export interface SettingsState {
    providerId: ProviderId;
    modelId: string;
    providersConfig: ProvidersConfig;
    ttsModel: string;
    ttsProviderId: TTSProviderId;
    ttsVoice: string;
    ttsSpeed: number;
    asrProviderId: ASRProviderId;
    asrLanguage: string;
    ttsProvidersConfig: Record<TTSProviderId, {
        apiKey: string;
        baseUrl: string;
        enabled: boolean;
        modelId?: string;
        customModels?: Array<{
            id: string;
            name: string;
        }>;
        providerOptions?: Record<string, unknown>;
        isServerConfigured?: boolean;
        serverBaseUrl?: string;
    }>;
    asrProvidersConfig: Record<ASRProviderId, {
        apiKey: string;
        baseUrl: string;
        enabled: boolean;
        modelId?: string;
        customModels?: Array<{
            id: string;
            name: string;
        }>;
        providerOptions?: Record<string, unknown>;
        isServerConfigured?: boolean;
        serverBaseUrl?: string;
    }>;
    pdfProviderId: PDFProviderId;
    pdfProvidersConfig: Record<PDFProviderId, {
        apiKey: string;
        baseUrl: string;
        enabled: boolean;
        isServerConfigured?: boolean;
        serverBaseUrl?: string;
    }>;
    imageProviderId: ImageProviderId;
    imageModelId: string;
    imageProvidersConfig: Record<ImageProviderId, {
        apiKey: string;
        baseUrl: string;
        enabled: boolean;
        isServerConfigured?: boolean;
        serverBaseUrl?: string;
        customModels?: Array<{
            id: string;
            name: string;
        }>;
    }>;
    videoProviderId: VideoProviderId;
    videoModelId: string;
    videoProvidersConfig: Record<VideoProviderId, {
        apiKey: string;
        baseUrl: string;
        enabled: boolean;
        isServerConfigured?: boolean;
        serverBaseUrl?: string;
        customModels?: Array<{
            id: string;
            name: string;
        }>;
    }>;
    imageGenerationEnabled: boolean;
    videoGenerationEnabled: boolean;
    webSearchProviderId: WebSearchProviderId;
    webSearchProvidersConfig: Record<WebSearchProviderId, {
        apiKey: string;
        baseUrl: string;
        enabled: boolean;
        isServerConfigured?: boolean;
        serverBaseUrl?: string;
    }>;
    ttsEnabled: boolean;
    asrEnabled: boolean;
    autoConfigApplied: boolean;
    ttsMuted: boolean;
    ttsVolume: number;
    autoPlayLecture: boolean;
    playbackSpeed: PlaybackSpeed;
    selectedAgentIds: string[];
    maxTurns: string;
    agentMode: 'preset' | 'auto';
    autoAgentCount: number;
    sidebarCollapsed: boolean;
    chatAreaCollapsed: boolean;
    chatAreaWidth: number;
    setModel: (providerId: ProviderId, modelId: string) => void;
    setProviderConfig: (providerId: ProviderId, config: Partial<ProvidersConfig[ProviderId]>) => void;
    setProvidersConfig: (config: ProvidersConfig) => void;
    setTtsModel: (model: string) => void;
    setTTSMuted: (muted: boolean) => void;
    setTTSVolume: (volume: number) => void;
    setAutoPlayLecture: (autoPlay: boolean) => void;
    setPlaybackSpeed: (speed: PlaybackSpeed) => void;
    setSelectedAgentIds: (ids: string[]) => void;
    setMaxTurns: (turns: string) => void;
    setAgentMode: (mode: 'preset' | 'auto') => void;
    setAutoAgentCount: (count: number) => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
    setChatAreaCollapsed: (collapsed: boolean) => void;
    setChatAreaWidth: (width: number) => void;
    setTTSProvider: (providerId: TTSProviderId) => void;
    setTTSVoice: (voice: string) => void;
    setTTSSpeed: (speed: number) => void;
    setASRProvider: (providerId: ASRProviderId) => void;
    setASRLanguage: (language: string) => void;
    setTTSProviderConfig: (providerId: TTSProviderId, config: Partial<{
        apiKey: string;
        baseUrl: string;
        enabled: boolean;
        modelId: string;
        customModels: Array<{
            id: string;
            name: string;
        }>;
        providerOptions: Record<string, unknown>;
    }>) => void;
    setASRProviderConfig: (providerId: ASRProviderId, config: Partial<{
        apiKey: string;
        baseUrl: string;
        enabled: boolean;
        modelId: string;
        customModels: Array<{
            id: string;
            name: string;
        }>;
        providerOptions: Record<string, unknown>;
    }>) => void;
    setTTSEnabled: (enabled: boolean) => void;
    setASREnabled: (enabled: boolean) => void;
    setPDFProvider: (providerId: PDFProviderId) => void;
    setPDFProviderConfig: (providerId: PDFProviderId, config: Partial<{
        apiKey: string;
        baseUrl: string;
        enabled: boolean;
    }>) => void;
    setImageProvider: (providerId: ImageProviderId) => void;
    setImageModelId: (modelId: string) => void;
    setImageProviderConfig: (providerId: ImageProviderId, config: Partial<{
        apiKey: string;
        baseUrl: string;
        enabled: boolean;
        customModels: Array<{
            id: string;
            name: string;
        }>;
    }>) => void;
    setVideoProvider: (providerId: VideoProviderId) => void;
    setVideoModelId: (modelId: string) => void;
    setVideoProviderConfig: (providerId: VideoProviderId, config: Partial<{
        apiKey: string;
        baseUrl: string;
        enabled: boolean;
        customModels: Array<{
            id: string;
            name: string;
        }>;
    }>) => void;
    setImageGenerationEnabled: (enabled: boolean) => void;
    setVideoGenerationEnabled: (enabled: boolean) => void;
    setWebSearchProvider: (providerId: WebSearchProviderId) => void;
    setWebSearchProviderConfig: (providerId: WebSearchProviderId, config: Partial<{
        apiKey: string;
        baseUrl: string;
        enabled: boolean;
    }>) => void;
    fetchServerProviders: () => Promise<void>;
}
export declare const useSettingsStore: import('zustand').UseBoundStore<Omit<import('zustand').StoreApi<SettingsState>, "setState" | "persist"> & {
    setState(partial: SettingsState | Partial<SettingsState> | ((state: SettingsState) => SettingsState | Partial<SettingsState>), replace?: false): unknown;
    setState(state: SettingsState | ((state: SettingsState) => SettingsState), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import('zustand/middleware').PersistOptions<SettingsState, Partial<SettingsState>, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: SettingsState) => void) => () => void;
        onFinishHydration: (fn: (state: SettingsState) => void) => () => void;
        getOptions: () => Partial<import('zustand/middleware').PersistOptions<SettingsState, Partial<SettingsState>, unknown>>;
    };
}>;
//# sourceMappingURL=settings.d.ts.map