/**
 * OpenMAIC Library — Server Entry Point
 *
 * Re-exports ALL server-side functions consumed by the NestJS backend.
 * Consumers should import ONLY from 'openmaiclib/server', never deep paths.
 */
export { generateClassroom } from './lib/server/classroom-generation';
export type { GenerateClassroomInput, GenerateClassroomResult, ClassroomGenerationProgress, ClassroomGenerationStep, } from './lib/server/classroom-generation';
export { resolveApiKey, resolveWebSearchApiKey, getServerProviders, getServerTTSProviders, getServerASRProviders, getServerPDFProviders, getServerImageProviders, getServerVideoProviders, getServerWebSearchProviders, resolveTTSApiKey, resolveTTSBaseUrl, resolvePDFApiKey, resolvePDFBaseUrl, resolveImageApiKey, resolveImageBaseUrl, resolveVideoApiKey, resolveVideoBaseUrl, } from './lib/server/provider-config';
export { resolveModel, resolveModelFromHeaders } from './lib/server/resolve-model';
export { persistClassroom } from './lib/server/classroom-storage';
export { generateMediaForClassroom, replaceMediaPlaceholders, generateTTSForClassroom, } from './lib/server/classroom-media-generation';
export { validateUrlForSSRF } from './lib/server/ssrf-guard';
export { callLLM, streamLLM } from './lib/ai/llm';
export { parseModelString } from './lib/ai/providers';
export { generateSceneOutlinesFromRequirements, applyOutlineFallbacks, } from './lib/generation/outline-generator';
export { generateSceneContent, generateSceneActions, createSceneWithActions, } from './lib/generation/scene-generator';
export { formatTeacherPersonaForPrompt, formatImageDescription, formatImagePlaceholder, buildVisionUserContent, uniquifyMediaElementIds, buildCompleteScene, } from './lib/generation/generation-pipeline';
export { buildPrompt, PROMPT_IDS } from './lib/generation/prompts';
export { MAX_VISION_IMAGES, MAX_PDF_CONTENT_CHARS } from './lib/constants/generation';
export { getDefaultAgents } from './lib/orchestration/registry/store';
export { statelessGenerate } from './lib/orchestration/stateless-generate';
export { searchWithTavily, formatSearchResultsAsContext } from './lib/web-search/tavily';
export { generateTTS } from './lib/audio/tts-providers';
export { generateImage, aspectRatioToDimensions } from './lib/media/image-providers';
export { generateVideo, normalizeVideoOptions } from './lib/media/video-providers';
export { parsePDF } from './lib/pdf/pdf-providers';
export type { Stage as StageType, Scene } from './lib/types/stage';
export type { UserRequirements, SceneOutline } from './lib/types/generation';
export type { AICallFn, AgentInfo } from './lib/generation/pipeline-types';
