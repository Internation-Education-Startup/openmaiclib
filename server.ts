/**
 * OpenMAIC Library — Server Entry Point
 *
 * Re-exports ALL server-side functions consumed by the NestJS backend.
 * Consumers should import ONLY from 'openmaiclib/server', never deep paths.
 */

// ─── Classroom Generation Pipeline ──────────────────────────────────
export { generateClassroom } from './lib/server/classroom-generation';
export type {
  GenerateClassroomInput,
  GenerateClassroomResult,
  ClassroomGenerationProgress,
  ClassroomGenerationStep,
} from './lib/server/classroom-generation';

// ─── Provider Config ────────────────────────────────────────────────
export {
  resolveApiKey,
  resolveWebSearchApiKey,
  getServerProviders,
  getServerTTSProviders,
  getServerASRProviders,
  getServerPDFProviders,
  getServerImageProviders,
  getServerVideoProviders,
  getServerWebSearchProviders,
  resolveTTSApiKey,
  resolveTTSBaseUrl,
  resolvePDFApiKey,
  resolvePDFBaseUrl,
  resolveImageApiKey,
  resolveImageBaseUrl,
  resolveVideoApiKey,
  resolveVideoBaseUrl,
} from './lib/server/provider-config';

// ─── Model Resolution ───────────────────────────────────────────────
export { resolveModel, resolveModelFromHeaders } from './lib/server/resolve-model';

// ─── Classroom Storage ──────────────────────────────────────────────
export { persistClassroom } from './lib/server/classroom-storage';

// ─── Media Generation (server-side) ─────────────────────────────────
export {
  generateMediaForClassroom,
  replaceMediaPlaceholders,
  generateTTSForClassroom,
} from './lib/server/classroom-media-generation';

// ─── SSRF Guard ─────────────────────────────────────────────────────
export { validateUrlForSSRF } from './lib/server/ssrf-guard';

// ─── AI / LLM ───────────────────────────────────────────────────────
export { callLLM, streamLLM } from './lib/ai/llm';
export { parseModelString } from './lib/ai/providers';

// ─── Generation Pipeline ────────────────────────────────────────────
export {
  generateSceneOutlinesFromRequirements,
  applyOutlineFallbacks,
} from './lib/generation/outline-generator';
export {
  generateSceneContent,
  generateSceneActions,
  createSceneWithActions,
} from './lib/generation/scene-generator';
export {
  formatTeacherPersonaForPrompt,
  formatImageDescription,
  formatImagePlaceholder,
  buildVisionUserContent,
  uniquifyMediaElementIds,
  buildCompleteScene,
} from './lib/generation/generation-pipeline';
export { buildPrompt, PROMPT_IDS } from './lib/generation/prompts';

// ─── Constants ──────────────────────────────────────────────────────
export { MAX_VISION_IMAGES, MAX_PDF_CONTENT_CHARS } from './lib/constants/generation';

// ─── Orchestration ──────────────────────────────────────────────────
export { getDefaultAgents } from './lib/orchestration/registry/store';
export { statelessGenerate } from './lib/orchestration/stateless-generate';

// ─── Web Search ─────────────────────────────────────────────────────
export { searchWithTavily, formatSearchResultsAsContext } from './lib/web-search/tavily';

// ─── TTS / Media / PDF ──────────────────────────────────────────────
export { generateTTS } from './lib/audio/tts-providers';
export { generateImage, aspectRatioToDimensions } from './lib/media/image-providers';
export { generateVideo, normalizeVideoOptions } from './lib/media/video-providers';
export { parsePDF } from './lib/pdf/pdf-providers';

// ─── Types ──────────────────────────────────────────────────────────
export type { Stage as StageType, Scene } from './lib/types/stage';
export type { UserRequirements, SceneOutline } from './lib/types/generation';
export type { AICallFn, AgentInfo } from './lib/generation/pipeline-types';
