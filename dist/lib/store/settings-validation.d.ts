/**
 * Provider selection validation utilities.
 *
 * Pure functions used by fetchServerProviders() to detect and fix
 * stale provider/model selections after server config changes.
 */
export type ProviderCfgLike = {
    isServerConfigured?: boolean;
    apiKey?: string;
};
/** Check whether a provider has a usable path (server config or client key). */
export declare function isProviderUsable(cfg: ProviderCfgLike | undefined): boolean;
/**
 * Validate current provider selection against updated config.
 * Returns the current ID if still usable, otherwise the first usable
 * provider from fallbackOrder, or defaultId if provided, or ''.
 */
export declare function validateProvider<T extends string>(currentId: T | '', configMap: Partial<Record<T, ProviderCfgLike>>, fallbackOrder: T[], defaultId?: T): T | '';
/**
 * Validate current model selection against available models list.
 * Falls back to first available model, or '' if list is empty.
 */
export declare function validateModel(currentModelId: string, availableModels: Array<{
    id: string;
}>): string;
//# sourceMappingURL=settings-validation.d.ts.map