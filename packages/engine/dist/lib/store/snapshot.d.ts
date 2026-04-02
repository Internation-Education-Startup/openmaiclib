export interface SnapshotState {
    snapshotCursor: number;
    snapshotLength: number;
    canUndo: () => boolean;
    canRedo: () => boolean;
    setSnapshotCursor: (cursor: number) => void;
    setSnapshotLength: (length: number) => void;
    initSnapshotDatabase: () => Promise<void>;
    addSnapshot: () => Promise<void>;
    undo: () => Promise<void>;
    redo: () => Promise<void>;
}
/**
 * Snapshot store for undo/redo functionality
 * Based on PPTist's snapshot store, migrated to Zustand
 *
 * Uses IndexedDB (via Dexie) to store snapshot history
 */
export declare const useSnapshotStore: import('zustand').UseBoundStore<import('zustand').StoreApi<SnapshotState>>;
