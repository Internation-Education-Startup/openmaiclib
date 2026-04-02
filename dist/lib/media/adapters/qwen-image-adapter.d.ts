import { ImageGenerationConfig, ImageGenerationOptions, ImageGenerationResult } from '../types';
/**
 * Lightweight connectivity test — validates API key by making a minimal
 * request. 401/403 means key invalid; other errors mean key is valid.
 */
export declare function testQwenImageConnectivity(config: ImageGenerationConfig): Promise<{
    success: boolean;
    message: string;
}>;
export declare function generateWithQwenImage(config: ImageGenerationConfig, options: ImageGenerationOptions): Promise<ImageGenerationResult>;
//# sourceMappingURL=qwen-image-adapter.d.ts.map