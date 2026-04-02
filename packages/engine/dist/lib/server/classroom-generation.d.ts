import { Scene, Stage } from '../types/stage';
export interface GenerateClassroomInput {
    requirement: string;
    pdfContent?: {
        text: string;
        images: string[];
    };
    language?: string;
    enableWebSearch?: boolean;
    enableImageGeneration?: boolean;
    enableVideoGeneration?: boolean;
    enableTTS?: boolean;
    agentMode?: 'default' | 'generate';
}
export type ClassroomGenerationStep = 'initializing' | 'researching' | 'generating_outlines' | 'generating_scenes' | 'generating_media' | 'generating_tts' | 'persisting' | 'completed';
export interface ClassroomGenerationProgress {
    step: ClassroomGenerationStep;
    progress: number;
    message: string;
    scenesGenerated: number;
    totalScenes?: number;
}
export interface GenerateClassroomResult {
    id: string;
    url: string;
    stage: Stage;
    scenes: Scene[];
    scenesCount: number;
    createdAt: string;
}
export declare function generateClassroom(input: GenerateClassroomInput, options: {
    baseUrl: string;
    onProgress?: (progress: ClassroomGenerationProgress) => Promise<void> | void;
}): Promise<GenerateClassroomResult>;
