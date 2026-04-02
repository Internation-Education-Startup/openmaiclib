interface UseDraftCacheOptions {
    key: string;
    debounceMs?: number;
}
interface UseDraftCacheReturn<T> {
    cachedValue: T | undefined;
    updateCache: (value: T) => void;
    clearCache: () => void;
}
export declare function useDraftCache<T>({ key, debounceMs, }: UseDraftCacheOptions): UseDraftCacheReturn<T>;
export {};
