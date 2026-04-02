import { ImageGenerationConfig, ImageGenerationOptions, ImageGenerationResult } from '../types';
export declare function generateWithMiniMaxImage(config: ImageGenerationConfig, options: ImageGenerationOptions): Promise<ImageGenerationResult>;
export declare function testMiniMaxImageConnectivity(config: ImageGenerationConfig): Promise<{
    success: boolean;
    message: string;
}>;
