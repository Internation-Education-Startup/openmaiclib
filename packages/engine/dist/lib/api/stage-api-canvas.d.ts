import { SlideTheme, SlideBackground } from '../types/slides';
import { StageStore, APIResult, HighlightOptions, SpotlightOptions } from './stage-api-types';
/**
 * Create the canvas operations API
 *
 * @param store - Zustand store instance
 * @returns Canvas namespace API
 */
export declare function createCanvasAPI(store: StageStore): {
    /**
     * Set background
     *
     * @param sceneId - Scene ID
     * @param background - Background settings
     * @returns Whether successful
     */
    setBackground(sceneId: string, background: SlideBackground): APIResult<boolean>;
    /**
     * Set theme
     *
     * @param sceneId - Scene ID
     * @param theme - Theme settings
     * @returns Whether successful
     */
    setTheme(sceneId: string, theme: Partial<SlideTheme>): APIResult<boolean>;
    /**
     * Highlight an element (teaching feature)
     *
     * Emphasize an element by adding a highlight border or shadow
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param options - Highlight options
     * @returns Whether successful
     */
    highlight(sceneId: string, elementId: string, options?: HighlightOptions): APIResult<boolean>;
    /**
     * Spotlight effect (teaching feature)
     *
     * Highlight a specific element while dimming everything else
     * Note: this requires a mask layer in the frontend rendering layer
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param options - Spotlight options
     * @returns Whether successful
     */
    spotlight(sceneId: string, elementId: string, options?: SpotlightOptions): APIResult<boolean>;
    /**
     * Clear all highlight and spotlight effects
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */
    clearHighlights(_sceneId: string): APIResult<boolean>;
    /**
     * Clear spotlight effect
     *
     * @returns Whether successful
     */
    clearSpotlight(_sceneId?: string): APIResult<boolean>;
    /**
     * Set percentage-mode spotlight
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param geometry - Percentage geometry info
     * @param options - Spotlight options
     * @returns Whether successful
     */
    setSpotlightPercentage(sceneId: string, elementId: string, geometry: import('../types/action').PercentageGeometry, options?: SpotlightOptions): APIResult<boolean>;
    /**
     * Set laser pointer effect
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param geometry - Percentage geometry info
     * @param options - Laser pointer options
     * @returns Whether successful
     */
    setLaser(sceneId: string, elementId: string, geometry: import('../types/action').PercentageGeometry, options?: import('../store/canvas').LaserOptions): APIResult<boolean>;
    /**
     * Clear laser pointer effect
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */
    clearLaser(_sceneId: string): APIResult<boolean>;
    /**
     * Set zoom effect
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param geometry - Percentage geometry info
     * @param scale - Zoom scale
     * @returns Whether successful
     */
    setZoom(sceneId: string, elementId: string, geometry: import('../types/action').PercentageGeometry, scale: number): APIResult<boolean>;
    /**
     * Clear zoom effect
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */
    clearZoom(_sceneId: string): APIResult<boolean>;
    /**
     * Clear all visual effects (spotlight, laser, zoom, etc.)
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */
    clearAllEffects(_sceneId: string): APIResult<boolean>;
    /**
     * Highlight multiple elements in batch
     *
     * @param sceneId - Scene ID
     * @param elementIds - Element ID list
     * @param options - Highlight options
     * @returns Whether successful
     */
    highlightMultiple(sceneId: string, elementIds: string[], options?: HighlightOptions): APIResult<boolean>;
};
