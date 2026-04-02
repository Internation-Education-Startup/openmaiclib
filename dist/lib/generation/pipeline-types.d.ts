import { GenerationProgress } from '../types/generation';
/** Lightweight agent info passed to the generation pipeline */
export interface AgentInfo {
    id: string;
    name: string;
    role: string;
    persona?: string;
}
/** Cross-page context for maintaining speech coherence across scenes */
export interface SceneGenerationContext {
    pageIndex: number;
    totalPages: number;
    allTitles: string[];
    previousSpeeches: string[];
}
/**
 * AI-generated slide data structure
 * Used to parse AI responses
 */
export interface GeneratedSlideData {
    elements: Array<{
        type: 'text' | 'image' | 'video' | 'shape' | 'chart' | 'latex' | 'line';
        left: number;
        top: number;
        width: number;
        height: number;
        [key: string]: unknown;
    }>;
    background?: {
        type: 'solid' | 'gradient';
        color?: string;
        gradient?: {
            type: 'linear' | 'radial';
            colors: Array<{
                pos: number;
                color: string;
            }>;
            rotate: number;
        };
    };
    remark?: string;
}
export interface GenerationResult<T> {
    success: boolean;
    data?: T;
    error?: string;
}
export interface GenerationCallbacks {
    onProgress?: (progress: GenerationProgress) => void;
    onStageComplete?: (stage: 1 | 2 | 3, result: unknown) => void;
    onError?: (error: string) => void;
}
export type AICallFn = (systemPrompt: string, userPrompt: string, images?: Array<{
    id: string;
    src: string;
}>) => Promise<string>;
//# sourceMappingURL=pipeline-types.d.ts.map