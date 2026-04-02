import { VideoGenerationConfig, VideoGenerationOptions, VideoGenerationResult } from '../types';
/**
 * Submit a video generation task to Seedance API.
 * Returns the task ID for polling.
 */
/**
 * Lightweight connectivity test — validates API key by making a GET request
 * to poll a non-existent task. If auth fails we get 401/403; if auth succeeds
 * we get 404 (task not found), confirming the key is valid.
 */
export declare function testSeedanceConnectivity(config: VideoGenerationConfig): Promise<{
    success: boolean;
    message: string;
}>;
export declare function submitSeedanceTask(config: VideoGenerationConfig, options: VideoGenerationOptions): Promise<string>;
/**
 * Poll the status of a Seedance video generation task.
 * Returns the result if complete, null if still running.
 * Throws on failure.
 */
export declare function pollSeedanceTask(config: VideoGenerationConfig, taskId: string): Promise<VideoGenerationResult | null>;
/**
 * Generate a video using Seedance: submit task + poll until complete.
 */
export declare function generateWithSeedance(config: VideoGenerationConfig, options: VideoGenerationOptions): Promise<VideoGenerationResult>;
//# sourceMappingURL=seedance-adapter.d.ts.map