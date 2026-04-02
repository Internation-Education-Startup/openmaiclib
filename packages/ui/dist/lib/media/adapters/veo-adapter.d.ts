import { VideoGenerationConfig, VideoGenerationOptions, VideoGenerationResult } from '../types';
/**
 * Lightweight connectivity test — validates API key by fetching model info.
 * Uses GET /v1beta/models/{model} which does not trigger generation.
 */
export declare function testVeoConnectivity(config: VideoGenerationConfig): Promise<{
    success: boolean;
    message: string;
}>;
export declare function generateWithVeo(config: VideoGenerationConfig, options: VideoGenerationOptions): Promise<VideoGenerationResult>;
