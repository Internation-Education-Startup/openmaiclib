import { SceneOutline, GeneratedSlideContent, GeneratedQuizContent, GeneratedInteractiveContent, GeneratedPBLContent, PdfImage, ImageMapping } from '../types/generation';
import { LanguageModel } from 'ai';
import { StageStore, createStageAPI } from '../api/stage-api';
import { Action } from '../types/action';
import { AgentInfo, SceneGenerationContext, AICallFn, GenerationResult, GenerationCallbacks } from './pipeline-types';
/**
 * Stage 3: Generate full scenes (parallel version)
 *
 * Two steps:
 * - Step 3.1: Outline -> Page content (slide/quiz)
 * - Step 3.2: Content + script -> Action list
 *
 * All scenes generated in parallel using Promise.all
 */
export declare function generateFullScenes(sceneOutlines: SceneOutline[], store: StageStore, aiCall: AICallFn, callbacks?: GenerationCallbacks): Promise<GenerationResult<string[]>>;
/**
 * Step 3.1: Generate content based on outline
 */
export declare function generateSceneContent(outline: SceneOutline, aiCall: AICallFn, assignedImages?: PdfImage[], imageMapping?: ImageMapping, languageModel?: LanguageModel, visionEnabled?: boolean, generatedMediaMapping?: ImageMapping, agents?: AgentInfo[]): Promise<GeneratedSlideContent | GeneratedQuizContent | GeneratedInteractiveContent | GeneratedPBLContent | null>;
/**
 * Step 3.2: Generate Actions based on content and script
 */
export declare function generateSceneActions(outline: SceneOutline, content: GeneratedSlideContent | GeneratedQuizContent | GeneratedInteractiveContent | GeneratedPBLContent, aiCall: AICallFn, ctx?: SceneGenerationContext, agents?: AgentInfo[], userProfile?: string): Promise<Action[]>;
/**
 * Create a complete scene with Actions
 */
export declare function createSceneWithActions(outline: SceneOutline, content: GeneratedSlideContent | GeneratedQuizContent | GeneratedInteractiveContent | GeneratedPBLContent, actions: Action[], api: ReturnType<typeof createStageAPI>): string | null;
