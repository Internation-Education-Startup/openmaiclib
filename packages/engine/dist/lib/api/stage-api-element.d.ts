import { PPTElement } from '../types/slides';
import { StageStore, APIResult, CreateElementParams } from './stage-api-types';
/**
 * Create the element management API
 *
 * @param store - Zustand store instance
 * @returns Element namespace API
 */
export declare function createElementAPI(store: StageStore): {
    /**
     * Add an element to a Slide
     *
     * @param sceneId - Scene ID
     * @param element - Element parameters (must include type, left, top, width, height)
     * @returns Element ID
     */
    add(sceneId: string, element: CreateElementParams): APIResult<string>;
    /**
     * Add elements in batch
     *
     * @deprecated will be removed in the future
     * @param sceneId - Scene ID
     * @param elements - Element array
     * @returns Element ID array
     */
    addBatch(sceneId: string, elements: CreateElementParams[]): APIResult<string[]>;
    /**
     * Delete an element
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @returns Whether successful
     */
    delete(sceneId: string, elementId: string): APIResult<boolean>;
    /**
     * Delete elements in batch
     *
     * @deprecated will be removed in the future
     * @param sceneId - Scene ID
     * @param elementIds - Element ID array
     * @returns Whether successful
     */
    deleteBatch(sceneId: string, elementIds: string[]): APIResult<boolean>;
    /**
     * Update an element
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param updates - Properties to update
     * @returns Whether successful
     */
    update(sceneId: string, elementId: string, updates: Partial<PPTElement>): APIResult<boolean>;
    /**
     * Get an element
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @returns Element object
     */
    get(sceneId: string, elementId: string): APIResult<PPTElement>;
    /**
     * Get all elements of a scene
     *
     * @param sceneId - Scene ID
     * @returns Element list
     */
    list(sceneId: string): APIResult<PPTElement[]>;
    /**
     * Move an element (relative movement)
     *
     * @deprecated will be removed in the future
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param deltaX - X-axis movement distance
     * @param deltaY - Y-axis movement distance
     * @returns Whether successful
     */
    move(sceneId: string, elementId: string, deltaX: number, deltaY: number): APIResult<boolean>;
};
