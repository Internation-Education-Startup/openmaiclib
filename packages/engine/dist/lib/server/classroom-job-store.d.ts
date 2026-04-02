import { ClassroomGenerationProgress, ClassroomGenerationStep, GenerateClassroomInput, GenerateClassroomResult } from './classroom-generation';
export type ClassroomGenerationJobStatus = 'queued' | 'running' | 'succeeded' | 'failed';
export interface ClassroomGenerationJob {
    id: string;
    status: ClassroomGenerationJobStatus;
    step: ClassroomGenerationStep | 'queued' | 'failed';
    progress: number;
    message: string;
    createdAt: string;
    updatedAt: string;
    startedAt?: string;
    completedAt?: string;
    inputSummary: {
        requirementPreview: string;
        language: string;
        hasPdf: boolean;
        pdfTextLength: number;
        pdfImageCount: number;
    };
    scenesGenerated: number;
    totalScenes?: number;
    result?: {
        classroomId: string;
        url: string;
        scenesCount: number;
    };
    error?: string;
}
export declare function isValidClassroomJobId(jobId: string): boolean;
export declare function createClassroomGenerationJob(jobId: string, input: GenerateClassroomInput): Promise<ClassroomGenerationJob>;
export declare function readClassroomGenerationJob(jobId: string): Promise<ClassroomGenerationJob | null>;
export declare function updateClassroomGenerationJob(jobId: string, patch: Partial<ClassroomGenerationJob>): Promise<ClassroomGenerationJob>;
export declare function markClassroomGenerationJobRunning(jobId: string): Promise<ClassroomGenerationJob>;
export declare function updateClassroomGenerationJobProgress(jobId: string, progress: ClassroomGenerationProgress): Promise<ClassroomGenerationJob>;
export declare function markClassroomGenerationJobSucceeded(jobId: string, result: GenerateClassroomResult): Promise<ClassroomGenerationJob>;
export declare function markClassroomGenerationJobFailed(jobId: string, error: string): Promise<ClassroomGenerationJob>;
