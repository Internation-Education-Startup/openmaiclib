import { default as React } from 'react';
import { Scene } from '../types/stage';
interface SceneContextValue<T = unknown> {
    sceneId: string;
    sceneType: Scene['type'];
    sceneData: T;
    updateSceneData: (updater: (draft: T) => void) => void;
    subscribe: (callback: () => void) => () => void;
    getSnapshot: () => T;
}
/**
 * Generic Scene Provider
 * Provides current scene data and update methods to child components
 * Automatically syncs changes back to stageStore
 *
 * Usage:
 * <SceneProvider>
 *   <SlideRenderer /> // Uses useSceneData<SlideContent>()
 * </SceneProvider>
 */
export declare function SceneProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
/**
 * Hook to access current scene data
 * Type-safe with generics
 *
 * @example
 * // In SlideRenderer
 * const { sceneData, updateSceneData } = useSceneData<SlideContent>();
 * const Canvas = sceneData.Canvas;
 *
 * // Update Canvas background
 * updateSceneData(draft => {
 *   draft.Canvas.background = { type: 'solid', color: '#fff' };
 * });
 */
export declare function useSceneData<T = unknown>(): SceneContextValue<T>;
/**
 * Hook to subscribe to a specific part of scene data
 * **Precise subscription** - only re-renders when the selector return value changes
 *
 * How it works:
 * 1. Uses useSyncExternalStore to subscribe to an external data source
 * 2. Selector extracts the needed data slice
 * 3. React auto-performs shallow comparison, only triggering re-render when the return value changes
 *
 * @example
 * // Only subscribes to background; changes to elements won't trigger re-render
 * const background = useSceneSelector<SlideContent>(
 *   content => content.Canvas.background
 * );
 */
export declare function useSceneSelector<T = unknown, R = unknown>(selector: (data: T) => R): R;
export {};
