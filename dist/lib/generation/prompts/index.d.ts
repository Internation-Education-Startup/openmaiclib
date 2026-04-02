/**
 * Prompt System - Simplified prompt management
 *
 * Features:
 * - File-based prompt storage in templates/
 * - Snippet composition via {{snippet:name}} syntax
 * - Variable interpolation via {{variable}} syntax
 */
export type { PromptId, SnippetId, LoadedPrompt } from './types';
export { loadPrompt, loadSnippet, buildPrompt, interpolateVariables, clearPromptCache, } from './loader';
export declare const PROMPT_IDS: {
    readonly REQUIREMENTS_TO_OUTLINES: "requirements-to-outlines";
    readonly SLIDE_CONTENT: "slide-content";
    readonly QUIZ_CONTENT: "quiz-content";
    readonly SLIDE_ACTIONS: "slide-actions";
    readonly QUIZ_ACTIONS: "quiz-actions";
    readonly INTERACTIVE_SCIENTIFIC_MODEL: "interactive-scientific-model";
    readonly INTERACTIVE_HTML: "interactive-html";
    readonly INTERACTIVE_ACTIONS: "interactive-actions";
    readonly PBL_ACTIONS: "pbl-actions";
};
//# sourceMappingURL=index.d.ts.map