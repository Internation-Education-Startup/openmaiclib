import { Stage, StageMode } from '../types/stage';
import { StageStore, APIResult } from './stage-api-types';
/**
 * Create the mode management API
 *
 * @param store - Zustand store instance
 * @returns Mode namespace API
 */
export declare function createModeAPI(store: StageStore): {
    /**
     * Set mode
     *
     * @param newMode - New mode
     */
    set(newMode: StageMode): APIResult<boolean>;
    /**
     * Get current mode
     *
     * @returns Current mode
     */
    get(): APIResult<StageMode>;
};
/**
 * Create the stage meta management API
 *
 * @param store - Zustand store instance
 * @returns Stage namespace API
 */
export declare function createStageMetaAPI(store: StageStore): {
    /**
     * Get Stage info
     *
     * @returns Stage object
     */
    get(): APIResult<Stage>;
    /**
     * Update Stage info
     *
     * @param updates - Fields to update
     * @returns Whether successful
     */
    update(updates: Partial<Stage>): APIResult<boolean>;
};
