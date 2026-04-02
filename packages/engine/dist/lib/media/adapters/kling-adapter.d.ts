import { VideoGenerationConfig, VideoGenerationOptions, VideoGenerationResult } from '../types';
/**
 * Lightweight connectivity test — validates API key by generating a JWT
 * and making a GET request. 401/403 means key invalid.
 */
export declare function testKlingConnectivity(config: VideoGenerationConfig): Promise<{
    success: boolean;
    message: string;
}>;
export declare function generateWithKling(config: VideoGenerationConfig, options: VideoGenerationOptions): Promise<VideoGenerationResult>;
