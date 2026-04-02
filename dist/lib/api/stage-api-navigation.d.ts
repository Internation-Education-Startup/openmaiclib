import { Scene } from '../types/stage';
import { StageStore, APIResult } from './stage-api-types';
/**
 * Create the navigation API
 *
 * @param store - Zustand store instance
 * @returns Navigation namespace API
 */
export declare function createNavigationAPI(store: StageStore): {
    /**
     * Navigate to a specific scene
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */
    goTo(sceneId: string): APIResult<boolean>;
    /**
     * Next scene
     *
     * @returns Whether successful
     */
    next(): APIResult<boolean>;
    /**
     * Previous scene
     *
     * @returns Whether successful
     */
    previous(): APIResult<boolean>;
    /**
     * Get the current scene
     *
     * @returns Current scene
     */
    current(): APIResult<Scene>;
};
//# sourceMappingURL=stage-api-navigation.d.ts.map