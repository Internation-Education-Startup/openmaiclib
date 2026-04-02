import { Stage, Scene, SceneContent, SceneType, StageMode } from '../types/stage';
import { PPTElement } from '../types/slides';
import { Action } from '../types/action';
/**
 * API operation result
 */
export interface APIResult<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
}
/**
 * Scene creation parameters
 */
export interface CreateSceneParams {
    type: SceneType;
    title: string;
    content?: Partial<SceneContent>;
    order?: number;
    actions?: Action[];
}
/**
 * Element creation parameters (required fields)
 */
export type CreateElementParams = {
    type: PPTElement['type'];
    left: number;
    top: number;
    width: number;
    height: number;
    rotate?: number;
    [key: string]: unknown;
};
/**
 * Highlight options
 */
export interface HighlightOptions {
    duration?: number;
    color?: string;
    style?: 'outline' | 'fill' | 'shadow';
}
/**
 * Spotlight options
 */
export interface SpotlightOptions {
    duration?: number;
    radius?: number;
    dimness?: number;
}
/**
 * Stage Store interface (for dependency injection)
 */
export interface StageStore {
    getState: () => {
        stage: Stage | null;
        scenes: Scene[];
        currentSceneId: string | null;
        mode: StageMode;
    };
    setState: (partial: any) => void;
    subscribe: (listener: (state: any, prevState: any) => void) => () => void;
}
//# sourceMappingURL=stage-api-types.d.ts.map