import { VideoGenerationConfig, VideoGenerationOptions, VideoGenerationResult } from '../types';
/**
 * Lightweight connectivity test — validates API key by making a minimal
 * request that triggers auth check. 401/403 means key invalid.
 */
export declare function testGrokVideoConnectivity(config: VideoGenerationConfig): Promise<{
    success: boolean;
    message: string;
}>;
export declare function generateWithGrokVideo(config: VideoGenerationConfig, options: VideoGenerationOptions): Promise<VideoGenerationResult>;
//# sourceMappingURL=grok-video-adapter.d.ts.map