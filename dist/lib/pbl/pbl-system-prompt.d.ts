/**
 * PBL Generation System Prompt
 *
 * Migrated from PBL-Nano's anything2pbl_nano.ts systemPrompt.
 * Enhanced with multi-language support and configurable parameters.
 */
export interface PBLSystemPromptConfig {
    projectTopic: string;
    projectDescription: string;
    targetSkills: string[];
    issueCount?: number;
    language: string;
}
export declare function buildPBLSystemPrompt(config: PBLSystemPromptConfig): string;
//# sourceMappingURL=pbl-system-prompt.d.ts.map