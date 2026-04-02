import { ImageProviderId, ImageGenerationConfig, ImageGenerationOptions, ImageGenerationResult, ImageProviderConfig } from './types';
export declare const IMAGE_PROVIDERS: Record<ImageProviderId, ImageProviderConfig>;
export declare function testImageConnectivity(config: ImageGenerationConfig): Promise<{
    success: boolean;
    message: string;
}>;
export declare function generateImage(config: ImageGenerationConfig, options: ImageGenerationOptions): Promise<ImageGenerationResult>;
export declare function aspectRatioToDimensions(ratio: string, maxWidth?: number): {
    width: number;
    height: number;
};
//# sourceMappingURL=image-providers.d.ts.map