/**
 * Prompt Loader - Build-time inlined prompts
 *
 * Uses Vite's ?raw imports to inline .md templates at build time.
 * No runtime fs access — works in both browser and Node.js contexts.
 *
 * Supports:
 * - Snippet inclusion via {{snippet:name}} syntax
 * - Variable interpolation via {{variable}} syntax
 * - Caching for performance
 */

import type { PromptId, LoadedPrompt, SnippetId } from './types';
import { createLogger } from '@/lib/logger';
const log = createLogger('PromptLoader');

// ─── Build-time inlined snippets ─────────────────────────────────────
import snippetActionTypes from './snippets/action-types.md?raw';
import snippetElementTypes from './snippets/element-types.md?raw';
import snippetJsonOutputRules from './snippets/json-output-rules.md?raw';

const SNIPPETS: Record<string, string> = {
  'action-types': snippetActionTypes,
  'element-types': snippetElementTypes,
  'json-output-rules': snippetJsonOutputRules,
};

// ─── Build-time inlined templates ────────────────────────────────────
import tplRequirementsToOutlinesSystem from './templates/requirements-to-outlines/system.md?raw';
import tplRequirementsToOutlinesUser from './templates/requirements-to-outlines/user.md?raw';
import tplSlideContentSystem from './templates/slide-content/system.md?raw';
import tplSlideContentUser from './templates/slide-content/user.md?raw';
import tplQuizContentSystem from './templates/quiz-content/system.md?raw';
import tplQuizContentUser from './templates/quiz-content/user.md?raw';
import tplSlideActionsSystem from './templates/slide-actions/system.md?raw';
import tplSlideActionsUser from './templates/slide-actions/user.md?raw';
import tplQuizActionsSystem from './templates/quiz-actions/system.md?raw';
import tplQuizActionsUser from './templates/quiz-actions/user.md?raw';
import tplInteractiveScientificModelSystem from './templates/interactive-scientific-model/system.md?raw';
import tplInteractiveScientificModelUser from './templates/interactive-scientific-model/user.md?raw';
import tplInteractiveHtmlSystem from './templates/interactive-html/system.md?raw';
import tplInteractiveHtmlUser from './templates/interactive-html/user.md?raw';
import tplInteractiveActionsSystem from './templates/interactive-actions/system.md?raw';
import tplInteractiveActionsUser from './templates/interactive-actions/user.md?raw';
import tplPblActionsSystem from './templates/pbl-actions/system.md?raw';
import tplPblActionsUser from './templates/pbl-actions/user.md?raw';

interface InlinedTemplate { system: string; user: string; }

const TEMPLATES: Record<string, InlinedTemplate> = {
  'requirements-to-outlines': { system: tplRequirementsToOutlinesSystem, user: tplRequirementsToOutlinesUser },
  'slide-content': { system: tplSlideContentSystem, user: tplSlideContentUser },
  'quiz-content': { system: tplQuizContentSystem, user: tplQuizContentUser },
  'slide-actions': { system: tplSlideActionsSystem, user: tplSlideActionsUser },
  'quiz-actions': { system: tplQuizActionsSystem, user: tplQuizActionsUser },
  'interactive-scientific-model': { system: tplInteractiveScientificModelSystem, user: tplInteractiveScientificModelUser },
  'interactive-html': { system: tplInteractiveHtmlSystem, user: tplInteractiveHtmlUser },
  'interactive-actions': { system: tplInteractiveActionsSystem, user: tplInteractiveActionsUser },
  'pbl-actions': { system: tplPblActionsSystem, user: tplPblActionsUser },
};

// Cache for processed prompts (after snippet expansion)
const promptCache = new Map<string, LoadedPrompt>();

/**
 * Load a snippet by ID
 */
export function loadSnippet(snippetId: SnippetId): string {
  const content = SNIPPETS[snippetId];
  if (content) return content.trim();
  log.warn(`Snippet not found: ${snippetId}`);
  return `{{snippet:${snippetId}}}`;
}

/**
 * Process snippet includes in a template
 */
function processSnippets(template: string): string {
  return template.replace(/\{\{snippet:(\w[\w-]*)\}\}/g, (_, snippetId) => {
    return loadSnippet(snippetId as SnippetId);
  });
}

/**
 * Load a prompt by ID
 */
export function loadPrompt(promptId: PromptId): LoadedPrompt | null {
  const cached = promptCache.get(promptId);
  if (cached) return cached;

  const tpl = TEMPLATES[promptId];
  if (!tpl) {
    log.error(`Prompt template not found: ${promptId}`);
    return null;
  }

  const loaded: LoadedPrompt = {
    id: promptId,
    systemPrompt: processSnippets(tpl.system.trim()),
    userPromptTemplate: processSnippets(tpl.user.trim()),
  };

  promptCache.set(promptId, loaded);
  return loaded;
}

/**
 * Interpolate variables in a template
 */
export function interpolateVariables(template: string, variables: Record<string, unknown>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = variables[key];
    if (value === undefined) return match;
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  });
}

/**
 * Build a complete prompt with variables
 */
export function buildPrompt(
  promptId: PromptId,
  variables: Record<string, unknown>,
): { system: string; user: string } | null {
  const prompt = loadPrompt(promptId);
  if (!prompt) return null;

  return {
    system: interpolateVariables(prompt.systemPrompt, variables),
    user: interpolateVariables(prompt.userPromptTemplate, variables),
  };
}

/**
 * Clear all caches
 */
export function clearPromptCache(): void {
  promptCache.clear();
}
