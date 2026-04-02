import { LanguageModel } from 'ai';
import { PBLProjectConfig } from './types';
export interface GeneratePBLConfig {
    projectTopic: string;
    projectDescription: string;
    targetSkills: string[];
    issueCount?: number;
    language: string;
}
export interface GeneratePBLCallbacks {
    onProgress?: (message: string) => void;
}
/**
 * Generate a complete PBL project configuration using an agentic loop.
 *
 * Uses Vercel AI SDK's generateText with tools and stopWhen to drive
 * a multi-step conversation where the LLM designs the project by
 * calling MCP tools.
 */
export declare function generatePBLContent(config: GeneratePBLConfig, model: LanguageModel, callbacks?: GeneratePBLCallbacks): Promise<PBLProjectConfig>;
