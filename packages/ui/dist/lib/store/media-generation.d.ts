import { MediaGenerationRequest } from '../media/types';
export type MediaTaskStatus = 'pending' | 'generating' | 'done' | 'failed';
export interface MediaTask {
    elementId: string;
    type: 'image' | 'video';
    status: MediaTaskStatus;
    prompt: string;
    params: {
        aspectRatio?: string;
        style?: string;
        duration?: number;
    };
    objectUrl?: string;
    poster?: string;
    error?: string;
    errorCode?: string;
    retryCount: number;
    stageId: string;
}
interface MediaGenerationState {
    tasks: Record<string, MediaTask>;
    enqueueTasks: (stageId: string, requests: MediaGenerationRequest[]) => void;
    markGenerating: (elementId: string) => void;
    markDone: (elementId: string, objectUrl: string, poster?: string) => void;
    markFailed: (elementId: string, error: string, errorCode?: string) => void;
    markPendingForRetry: (elementId: string) => void;
    getTask: (elementId: string) => MediaTask | undefined;
    isReady: (elementId: string) => boolean;
    restoreFromDB: (stageId: string) => Promise<void>;
    clearStage: (stageId: string) => void;
    revokeObjectUrls: () => void;
}
/** Check if a src string is a generated media placeholder ID */
export declare function isMediaPlaceholder(src: string): boolean;
export declare const useMediaGenerationStore: import('zustand').UseBoundStore<import('zustand').StoreApi<MediaGenerationState>>;
export {};
