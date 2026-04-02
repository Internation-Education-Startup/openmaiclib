import { PdfImage } from '../types/generation';
import { AgentInfo, SceneGenerationContext } from './pipeline-types';
/** Build a course context string for injection into action prompts */
export declare function buildCourseContext(ctx?: SceneGenerationContext): string;
/** Format agent list for injection into action prompts */
export declare function formatAgentsForPrompt(agents?: AgentInfo[]): string;
/** Extract the teacher agent's persona for injection into outline/content prompts */
export declare function formatTeacherPersonaForPrompt(agents?: AgentInfo[]): string;
/**
 * Format a single PdfImage description for prompt inclusion.
 * Includes dimension/aspect-ratio info when available.
 */
export declare function formatImageDescription(img: PdfImage, language: string): string;
/**
 * Format a short image placeholder for vision mode.
 * Only ID + page + dimensions + aspect ratio (no description), since the model can see the actual image.
 */
export declare function formatImagePlaceholder(img: PdfImage, language: string): string;
/**
 * Build a multimodal user content array for the AI SDK.
 * Interleaves text and images so the model can associate img_id with actual image.
 * Each image label includes dimensions when available so the model knows the size
 * before seeing the image (important for layout decisions).
 */
export declare function buildVisionUserContent(userPrompt: string, images: Array<{
    id: string;
    src: string;
    width?: number;
    height?: number;
}>): Array<{
    type: 'text';
    text: string;
} | {
    type: 'image';
    image: string;
    mimeType?: string;
}>;
