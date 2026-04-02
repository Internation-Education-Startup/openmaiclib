import { VideoGenerationConfig, VideoGenerationOptions, VideoGenerationResult } from '../types';
export declare function generateWithMiniMaxVideo(config: VideoGenerationConfig, options: VideoGenerationOptions): Promise<VideoGenerationResult>;
export declare function testMiniMaxVideoConnectivity(config: VideoGenerationConfig): Promise<{
    success: boolean;
    message: string;
}>;
//# sourceMappingURL=minimax-video-adapter.d.ts.map