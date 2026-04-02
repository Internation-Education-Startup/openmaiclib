import { ImageGenerationConfig, ImageGenerationOptions, ImageGenerationResult } from '../types';
/**
 * Lightweight connectivity test — validates API key by making a minimal
 * request that triggers auth check. 401/403 means key invalid.
 */
export declare function testSeedreamConnectivity(config: ImageGenerationConfig): Promise<{
    success: boolean;
    message: string;
}>;
export declare function generateWithSeedream(config: ImageGenerationConfig, options: ImageGenerationOptions): Promise<ImageGenerationResult>;
