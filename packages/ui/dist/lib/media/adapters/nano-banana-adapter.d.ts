import { ImageGenerationConfig, ImageGenerationOptions, ImageGenerationResult } from '../types';
/**
 * Lightweight connectivity test — validates API key by fetching model info.
 * Uses GET /v1beta/models/{model} which does not trigger generation.
 */
export declare function testNanoBananaConnectivity(config: ImageGenerationConfig): Promise<{
    success: boolean;
    message: string;
}>;
export declare function generateWithNanoBanana(config: ImageGenerationConfig, options: ImageGenerationOptions): Promise<ImageGenerationResult>;
