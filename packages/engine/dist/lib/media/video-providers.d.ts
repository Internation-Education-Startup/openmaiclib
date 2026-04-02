import { VideoProviderId, VideoGenerationConfig, VideoGenerationOptions, VideoGenerationResult, VideoProviderConfig } from './types';
export declare const VIDEO_PROVIDERS: Record<VideoProviderId, VideoProviderConfig>;
export declare function testVideoConnectivity(config: VideoGenerationConfig): Promise<{
    success: boolean;
    message: string;
}>;
/**
 * Normalize video generation options against provider capabilities.
 * Ensures duration, aspectRatio, and resolution are valid for the given provider.
 * Falls back to the first supported value when the requested value is unsupported.
 */
export declare function normalizeVideoOptions(providerId: VideoProviderId, options: VideoGenerationOptions): VideoGenerationOptions;
export declare function generateVideo(config: VideoGenerationConfig, options: VideoGenerationOptions): Promise<VideoGenerationResult>;
