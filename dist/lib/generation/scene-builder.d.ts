import { SceneOutline, GeneratedSlideContent, GeneratedQuizContent, GeneratedInteractiveContent, GeneratedPBLContent, PdfImage, ImageMapping } from '../types/generation';
import { LanguageModel } from 'ai';
import { Scene } from '../types/stage';
import { Action } from '../types/action';
import { AgentInfo, SceneGenerationContext, AICallFn } from './pipeline-types';
/**
 * Replace sequential gen_img_N / gen_vid_N IDs in outlines with globally unique IDs.
 *
 * The LLM generates sequential placeholder IDs (gen_img_1, gen_img_2, ...) which are
 * only unique within a single course. Since the media store uses elementId as key
 * without stageId scoping, identical IDs across different courses cause thumbnail
 * contamination on the homepage. Using nanoid-based IDs ensures global uniqueness.
 */
export declare function uniquifyMediaElementIds(outlines: SceneOutline[]): SceneOutline[];
/**
 * Build a complete Scene object from an outline (for SSE streaming)
 * This function does NOT depend on store - it returns a complete Scene object
 */
export declare function buildSceneFromOutline(outline: SceneOutline, aiCall: AICallFn, stageId: string, assignedImages?: PdfImage[], imageMapping?: ImageMapping, languageModel?: LanguageModel, visionEnabled?: boolean, ctx?: SceneGenerationContext, agents?: AgentInfo[], onPhaseChange?: (phase: 'content' | 'actions') => void, userProfile?: string): Promise<Scene | null>;
/**
 * Build complete Scene object (without API/store)
 */
export declare function buildCompleteScene(outline: SceneOutline, content: GeneratedSlideContent | GeneratedQuizContent | GeneratedInteractiveContent | GeneratedPBLContent, actions: Action[], stageId: string): Scene | null;
//# sourceMappingURL=scene-builder.d.ts.map