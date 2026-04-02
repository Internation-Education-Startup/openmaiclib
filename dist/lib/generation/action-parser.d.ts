import { Action } from '../types/action';
/**
 * Parse a complete LLM response in JSON Array format into an ordered Action[] array.
 *
 * Expected format (new):
 * [{"type":"action","name":"spotlight","params":{"elementId":"..."}},
 *  {"type":"text","content":"speech content"},...]
 *
 * Also supports legacy format:
 * [{"type":"action","tool_name":"spotlight","parameters":{"elementId":"..."}},...]
 *
 * Text items become `speech` actions; action items are converted to their
 * respective action types (spotlight, discussion, etc.).
 * The original interleaving order is preserved.
 */
export declare function parseActionsFromStructuredOutput(response: string, sceneType?: string, allowedActions?: string[]): Action[];
//# sourceMappingURL=action-parser.d.ts.map