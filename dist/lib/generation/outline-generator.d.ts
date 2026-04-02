import { UserRequirements, SceneOutline, PdfImage, ImageMapping } from '../types/generation';
import { AICallFn, GenerationResult, GenerationCallbacks } from './pipeline-types';
/**
 * Generate scene outlines from user requirements
 * Now uses simplified UserRequirements with just requirement text and language
 */
export declare function generateSceneOutlinesFromRequirements(requirements: UserRequirements, pdfText: string | undefined, pdfImages: PdfImage[] | undefined, aiCall: AICallFn, callbacks?: GenerationCallbacks, options?: {
    visionEnabled?: boolean;
    imageMapping?: ImageMapping;
    imageGenerationEnabled?: boolean;
    videoGenerationEnabled?: boolean;
    researchContext?: string;
    teacherContext?: string;
}): Promise<GenerationResult<SceneOutline[]>>;
/**
 * Apply type fallbacks for outlines that can't be generated as their declared type.
 * - interactive without interactiveConfig → slide
 * - pbl without pblConfig or languageModel → slide
 */
export declare function applyOutlineFallbacks(outline: SceneOutline, hasLanguageModel: boolean): SceneOutline;
//# sourceMappingURL=outline-generator.d.ts.map