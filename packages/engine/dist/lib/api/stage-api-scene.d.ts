import { Scene } from '../types/stage';
import { StageStore, APIResult, CreateSceneParams } from './stage-api-types';
/**
 * Create the scene management API
 *
 * @param store - Zustand store instance
 * @returns Scene namespace API
 */
export declare function createSceneAPI(store: StageStore): {
    /**
     * Create a new scene
     *
     * @param params - Scene parameters
     * @returns Scene ID
     *
     * @example
     * const sceneId = api.scene.create({
     *   type: 'slide',
     *   title: 'Introduction',
     *   // speech is now in actions
     * });
     */
    create(params: CreateSceneParams): APIResult<string>;
    /**
     * Delete a scene
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */
    delete(sceneId: string): APIResult<boolean>;
    /**
     * Update a scene
     *
     * @param sceneId - Scene ID
     * @param updates - Fields to update
     * @returns Whether successful
     */
    update(sceneId: string, updates: Partial<Scene>): APIResult<boolean>;
    /**
     * Get all scenes
     *
     * @returns Scene list
     */
    list(): APIResult<Scene[]>;
    /**
     * Get a specific scene
     *
     * @param sceneId - Scene ID
     * @returns Scene object
     */
    get(sceneId: string): APIResult<Scene>;
};
