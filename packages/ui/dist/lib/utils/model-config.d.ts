/**
 * Get current model configuration from settings store
 */
export declare function getCurrentModelConfig(): {
    providerId: import('../types/provider').ProviderId;
    modelId: string;
    modelString: string;
    apiKey: string;
    baseUrl: string;
    providerType: import('../types/provider').ProviderType;
    requiresApiKey: boolean;
    isServerConfigured: boolean;
};
