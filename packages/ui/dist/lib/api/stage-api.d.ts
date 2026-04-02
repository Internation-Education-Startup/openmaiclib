import { StageStore } from './stage-api-types';
/**
 * Stage API - AI Agent Toolkit
 *
 * Provides a complete Stage operation interface for AI Agents to create and manage course content
 *
 * Design Principles:
 * 1. Type Safety: Fully leverage TypeScript's type system
 * 2. Ease of Use: Provide high-level abstractions with clear, intuitive API naming
 * 3. Extensibility: Support adding new scene types in the future
 * 4. Idempotency: Multiple calls with the same parameters produce the same result
 * 5. Error Handling: Return explicit success/failure status and error messages
 *
 * @example
 * ```typescript
 * const api = createStageAPI(stageStore);
 *
 * // Create a new scene
 * const sceneId = api.scene.create({
 *   type: 'slide',
 *   title: 'Introduction',
 *   // speech is now in actions
 * });
 *
 * // Add an element
 * const elementId = api.element.add(sceneId, {
 *   type: 'text',
 *   content: 'Hello World',
 *   left: 100,
 *   top: 100
 * });
 *
 * // Highlight an element (teaching feature)
 * api.canvas.highlight(sceneId, elementId, 3000);
 * ```
 */
export type { APIResult, CreateSceneParams, CreateElementParams, HighlightOptions, SpotlightOptions, StageStore, } from './stage-api-types';
export { generateId, validateSceneId, getScene, createDefaultContent, createDefaultSlideContent, createDefaultQuizContent, createDefaultInteractiveContent, createDefaultPBLContent, } from './stage-api-defaults';
/**
 * Create a Stage API instance
 *
 * @param store - Zustand store instance
 * @returns Stage API object
 */
export declare function createStageAPI(store: StageStore): {
    scene: {
        create(params: import('./stage-api-types').CreateSceneParams): import('./stage-api-types').APIResult<string>;
        delete(sceneId: string): import('./stage-api-types').APIResult<boolean>;
        update(sceneId: string, updates: Partial<import('../../packages/ui').Scene>): import('./stage-api-types').APIResult<boolean>;
        list(): import('./stage-api-types').APIResult<import('../../packages/ui').Scene[]>;
        get(sceneId: string): import('./stage-api-types').APIResult<import('../../packages/ui').Scene>;
    };
    navigation: {
        goTo(sceneId: string): import('./stage-api-types').APIResult<boolean>;
        next(): import('./stage-api-types').APIResult<boolean>;
        previous(): import('./stage-api-types').APIResult<boolean>;
        current(): import('./stage-api-types').APIResult<import('../../packages/ui').Scene>;
    };
    element: {
        add(sceneId: string, element: import('./stage-api-types').CreateElementParams): import('./stage-api-types').APIResult<string>;
        addBatch(sceneId: string, elements: import('./stage-api-types').CreateElementParams[]): import('./stage-api-types').APIResult<string[]>;
        delete(sceneId: string, elementId: string): import('./stage-api-types').APIResult<boolean>;
        deleteBatch(sceneId: string, elementIds: string[]): import('./stage-api-types').APIResult<boolean>;
        update(sceneId: string, elementId: string, updates: Partial<import('../types/slides').PPTElement>): import('./stage-api-types').APIResult<boolean>;
        get(sceneId: string, elementId: string): import('./stage-api-types').APIResult<import('../types/slides').PPTElement>;
        list(sceneId: string): import('./stage-api-types').APIResult<import('../types/slides').PPTElement[]>;
        move(sceneId: string, elementId: string, deltaX: number, deltaY: number): import('./stage-api-types').APIResult<boolean>;
    };
    canvas: {
        setBackground(sceneId: string, background: import('../types/slides').SlideBackground): import('./stage-api-types').APIResult<boolean>;
        setTheme(sceneId: string, theme: Partial<import('../types/slides').SlideTheme>): import('./stage-api-types').APIResult<boolean>;
        highlight(sceneId: string, elementId: string, options?: import('./stage-api-types').HighlightOptions): import('./stage-api-types').APIResult<boolean>;
        spotlight(sceneId: string, elementId: string, options?: import('./stage-api-types').SpotlightOptions): import('./stage-api-types').APIResult<boolean>;
        clearHighlights(_sceneId: string): import('./stage-api-types').APIResult<boolean>;
        clearSpotlight(_sceneId?: string): import('./stage-api-types').APIResult<boolean>;
        setSpotlightPercentage(sceneId: string, elementId: string, geometry: import('../types/action').PercentageGeometry, options?: import('./stage-api-types').SpotlightOptions): import('./stage-api-types').APIResult<boolean>;
        setLaser(sceneId: string, elementId: string, geometry: import('../types/action').PercentageGeometry, options?: import('../store/canvas').LaserOptions): import('./stage-api-types').APIResult<boolean>;
        clearLaser(_sceneId: string): import('./stage-api-types').APIResult<boolean>;
        setZoom(sceneId: string, elementId: string, geometry: import('../types/action').PercentageGeometry, scale: number): import('./stage-api-types').APIResult<boolean>;
        clearZoom(_sceneId: string): import('./stage-api-types').APIResult<boolean>;
        clearAllEffects(_sceneId: string): import('./stage-api-types').APIResult<boolean>;
        highlightMultiple(sceneId: string, elementIds: string[], options?: import('./stage-api-types').HighlightOptions): import('./stage-api-types').APIResult<boolean>;
    };
    whiteboard: {
        create(): import('./stage-api-types').APIResult<import('../types/stage').Whiteboard>;
        get(): import('./stage-api-types').APIResult<import('../types/stage').Whiteboard>;
        update(updates: Partial<import('../types/stage').Whiteboard>, whiteboardId: string): import('./stage-api-types').APIResult<boolean>;
        delete(whiteboardId: string): import('./stage-api-types').APIResult<boolean>;
        list(): import('./stage-api-types').APIResult<import('../types/stage').Whiteboard[]>;
        getElement(elementId: string, whiteboardId: string): import('./stage-api-types').APIResult<import('../types/slides').PPTElement>;
        addElement(element: import('../types/slides').PPTElement, whiteboardId: string): import('./stage-api-types').APIResult<boolean>;
        deleteElement(elementId: string, whiteboardId: string): import('./stage-api-types').APIResult<boolean>;
        updateElement(element: import('../types/slides').PPTElement, whiteboardId: string): import('./stage-api-types').APIResult<boolean>;
        listElements(whiteboardId: string): import('./stage-api-types').APIResult<import('../types/slides').PPTElement[]>;
    };
    mode: {
        set(newMode: import('../types/stage').StageMode): import('./stage-api-types').APIResult<boolean>;
        get(): import('./stage-api-types').APIResult<import('../types/stage').StageMode>;
    };
    stage: {
        get(): import('./stage-api-types').APIResult<import('../../packages/ui').StageType>;
        update(updates: Partial<import('../../packages/ui').StageType>): import('./stage-api-types').APIResult<boolean>;
    };
};
export type StageAPI = ReturnType<typeof createStageAPI>;
