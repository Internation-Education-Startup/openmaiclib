import { PromptId, LoadedPrompt, SnippetId } from './types';
/**
 * Load a snippet by ID
 */
export declare function loadSnippet(snippetId: SnippetId): string;
/**
 * Load a prompt by ID
 */
export declare function loadPrompt(promptId: PromptId): LoadedPrompt | null;
/**
 * Interpolate variables in a template
 */
export declare function interpolateVariables(template: string, variables: Record<string, unknown>): string;
/**
 * Build a complete prompt with variables
 */
export declare function buildPrompt(promptId: PromptId, variables: Record<string, unknown>): {
    system: string;
    user: string;
} | null;
/**
 * Clear all caches
 */
export declare function clearPromptCache(): void;
