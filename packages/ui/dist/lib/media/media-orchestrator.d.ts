import { SceneOutline } from '../types/generation';
/**
 * Launch media generation for all mediaGenerations declared in outlines.
 * Runs in parallel with content/action generation — does not block.
 */
export declare function generateMediaForOutlines(outlines: SceneOutline[], stageId: string, abortSignal?: AbortSignal): Promise<void>;
/**
 * Retry a single failed media task.
 */
export declare function retryMediaTask(elementId: string): Promise<void>;
