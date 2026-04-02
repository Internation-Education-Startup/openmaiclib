import { ImageGenerationConfig, ImageGenerationOptions, ImageGenerationResult } from '../types';
/**
 * Lightweight connectivity test — validates API key by making a minimal
 * request that triggers auth check. 401/403 means key invalid.
 */
export declare function testGrokImageConnectivity(config: ImageGenerationConfig): Promise<{
    success: boolean;
    message: string;
}>;
export declare function generateWithGrokImage(config: ImageGenerationConfig, options: ImageGenerationOptions): Promise<ImageGenerationResult>;
//# sourceMappingURL=grok-image-adapter.d.ts.map