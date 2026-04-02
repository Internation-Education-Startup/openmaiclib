import { Stage, Scene } from '../types/stage';
import { ChatSession } from '../types/chat';
export interface StageStoreData {
    stage: Stage;
    scenes: Scene[];
    currentSceneId: string | null;
    chats: ChatSession[];
}
export interface StageListItem {
    id: string;
    name: string;
    description?: string;
    sceneCount: number;
    createdAt: number;
    updatedAt: number;
}
/**
 * Save stage data to IndexedDB
 */
export declare function saveStageData(stageId: string, data: StageStoreData): Promise<void>;
/**
 * Load stage data from IndexedDB
 */
export declare function loadStageData(stageId: string): Promise<StageStoreData | null>;
/**
 * Delete stage and all related data
 */
export declare function deleteStageData(stageId: string): Promise<void>;
/**
 * List all stages
 */
export declare function listStages(): Promise<StageListItem[]>;
/**
 * Get first slide scene's canvas data for each stage (for thumbnail preview).
 * Also resolves gen_img_* placeholders from mediaFiles so thumbnails show real images.
 * Returns a map of stageId -> Slide (canvas data with resolved images)
 */
export declare function getFirstSlideByStages(stageIds: string[]): Promise<Record<string, import('../types/slides').Slide>>;
/**
 * Rename a stage (updates only the name field in IndexedDB)
 */
export declare function renameStage(stageId: string, newName: string): Promise<void>;
/**
 * Check if stage exists
 */
export declare function stageExists(stageId: string): Promise<boolean>;
//# sourceMappingURL=stage-storage.d.ts.map