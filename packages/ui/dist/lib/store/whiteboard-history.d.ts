import { PPTElement } from '../types/slides';
export interface WhiteboardSnapshot {
    /** Deep copy of whiteboard elements at the time of capture */
    elements: PPTElement[];
    /** Timestamp when the snapshot was taken */
    timestamp: number;
    /** Cached fingerprint used for deduplication and no-op restore checks */
    fingerprint: string;
}
interface WhiteboardHistoryState {
    /** Stack of snapshots, newest last */
    snapshots: WhiteboardSnapshot[];
    /** Maximum number of snapshots to keep */
    maxSnapshots: number;
    /** Save a snapshot of the current whiteboard elements */
    pushSnapshot: (elements: PPTElement[]) => void;
    /** Get a snapshot by index */
    getSnapshot: (index: number) => WhiteboardSnapshot | null;
    /** Clear all history */
    clearHistory: () => void;
}
export declare const useWhiteboardHistoryStore: import('zustand').UseBoundStore<import('zustand').StoreApi<WhiteboardHistoryState>>;
export {};
