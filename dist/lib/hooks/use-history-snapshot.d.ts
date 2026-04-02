/**
 * Hook for managing history snapshots (undo/redo)
 *
 * Usage:
 * ```tsx
 * const { addHistorySnapshot, canUndo, canRedo, undo, redo } = useHistorySnapshot();
 *
 * // After making changes
 * await addHistorySnapshot();
 *
 * // Undo/Redo
 * if (canUndo) await undo();
 * if (canRedo) await redo();
 * ```
 */
export declare function useHistorySnapshot(): {
    addHistorySnapshot: () => Promise<void>;
    undo: () => Promise<void>;
    redo: () => Promise<void>;
    canUndo: boolean;
    canRedo: boolean;
};
//# sourceMappingURL=use-history-snapshot.d.ts.map