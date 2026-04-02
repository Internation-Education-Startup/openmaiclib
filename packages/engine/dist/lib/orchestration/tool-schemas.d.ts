/**
 * Action Schemas for Stateless Generation
 *
 * Text descriptions of actions for inclusion in structured output prompts.
 * Actions are parsed from JSON array items in the model's response.
 */
/**
 * Filter allowed actions by scene type.
 * Slide-only actions (spotlight, laser) are removed for non-slide scenes.
 */
export declare function getEffectiveActions(allowedActions: string[], sceneType?: string): string[];
/**
 * Get text descriptions of allowed actions for inclusion in system prompts.
 * Used when the model generates structured output with JSON array format.
 */
export declare function getActionDescriptions(allowedActions: string[]): string;
