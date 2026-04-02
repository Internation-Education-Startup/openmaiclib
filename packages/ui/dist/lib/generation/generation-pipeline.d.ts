/**
 * Two-Stage Generation Pipeline
 *
 * Barrel re-export — all symbols previously exported from this file
 * are now spread across focused sub-modules.
 */
export type { AgentInfo, SceneGenerationContext, GeneratedSlideData, GenerationResult, GenerationCallbacks, AICallFn, } from './pipeline-types';
export { buildCourseContext, formatAgentsForPrompt, formatTeacherPersonaForPrompt, formatImageDescription, formatImagePlaceholder, buildVisionUserContent, } from './prompt-formatters';
export { parseJsonResponse, tryParseJson } from './json-repair';
export { generateSceneOutlinesFromRequirements, applyOutlineFallbacks } from './outline-generator';
export { generateFullScenes, generateSceneContent, generateSceneActions, createSceneWithActions, } from './scene-generator';
export { buildSceneFromOutline, buildCompleteScene, uniquifyMediaElementIds, } from './scene-builder';
export { createGenerationSession, runGenerationPipeline } from './pipeline-runner';
