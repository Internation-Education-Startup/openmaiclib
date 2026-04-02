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
 * Replaces {{variable}} with values from the variables object
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
 * Clear all caches (useful for development/testing)
 */
export declare function clearPromptCache(): void;
//# sourceMappingURL=loader.d.ts.map