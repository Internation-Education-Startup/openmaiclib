import { Whiteboard } from '../types/stage';
import { PPTElement } from '../types/slides';
import { StageStore, APIResult } from './stage-api-types';
/**
 * Create the whiteboard management API
 *
 * @param store - Zustand store instance
 * @returns Whiteboard namespace API
 */
export declare function createWhiteboardAPI(store: StageStore): {
    /**
     * Create a whiteboard
     *
     * @returns Whether successful
     */
    create(): APIResult<Whiteboard>;
    /**
     * Get a whiteboard
     *
     * @returns The most recently created whiteboard object
     */
    get(): APIResult<Whiteboard>;
    /**
     * Update a whiteboard
     *
     * @param updates - Fields to update
     * @param whiteboardId - Whiteboard ID
     * @returns Whether successful
     */
    update(updates: Partial<Whiteboard>, whiteboardId: string): APIResult<boolean>;
    /**
     * Delete a whiteboard
     *
     * @param whiteboardId - Whiteboard ID
     * @returns Whether successful
     */
    delete(whiteboardId: string): APIResult<boolean>;
    /**
     * Get all whiteboards
     *
     * @returns List of all whiteboards
     */
    list(): APIResult<Whiteboard[]>;
    /**
     * Get a whiteboard element
     *
     * @param elementId - Element ID
     * @param whiteboardId - Whiteboard ID
     * @returns Element object
     */
    getElement(elementId: string, whiteboardId: string): APIResult<PPTElement>;
    /**
     * Add a whiteboard element
     *
     * @param element - Element object
     * @param whiteboardId - Whiteboard ID
     * @returns Whether successful
     */
    addElement(element: PPTElement, whiteboardId: string): APIResult<boolean>;
    /**
     * Delete a whiteboard element
     *
     * @param elementId - Element ID
     * @param whiteboardId - Whiteboard ID
     * @returns Whether successful
     */
    deleteElement(elementId: string, whiteboardId: string): APIResult<boolean>;
    /**
     * Update a whiteboard element
     *
     * @param element - Element object
     * @param whiteboardId - Whiteboard ID
     * @returns Whether successful
     */
    updateElement(element: PPTElement, whiteboardId: string): APIResult<boolean>;
    /**
     * Get whiteboard element list
     *
     * @param whiteboardId - Whiteboard ID
     * @returns Element list
     */
    listElements(whiteboardId: string): APIResult<PPTElement[]>;
};
//# sourceMappingURL=stage-api-whiteboard.d.ts.map