import { ActionType } from './action';
import { MediaGenerationRequest } from '../media/types';
import { PPTElement, SlideBackground } from './slides';
import { QuizQuestion } from './stage';
import { PBLProjectConfig } from '../pbl/types';
/**
 * Image extracted from PDF with metadata
 */
export interface PdfImage {
    id: string;
    src: string;
    pageNumber: number;
    description?: string;
    storageId?: string;
    width?: number;
    height?: number;
}
/**
 * Image mapping for post-processing: image_id → base64 URL
 */
export type ImageMapping = Record<string, string>;
export interface AudienceProfile {
    gradeLevel: string;
    ageRange?: string;
    prerequisites?: string[];
    learningStyles?: ('visual' | 'auditory' | 'kinesthetic' | 'reading')[];
}
export interface StylePreferences {
    tone: 'formal' | 'casual' | 'engaging' | 'academic';
    visualStyle: 'minimalist' | 'colorful' | 'professional' | 'playful';
    interactivityLevel: 'low' | 'medium' | 'high';
    includeExamples: boolean;
    includePractice: boolean;
    language: string;
}
export interface UploadedDocument {
    id: string;
    name: string;
    type: 'pdf' | 'docx' | 'pptx' | 'txt' | 'md' | 'image' | 'other';
    size: number;
    uploadedAt: Date;
    contentSummary?: string;
    extractedTopics?: string[];
    pageCount?: number;
    storageRef?: string;
}
/**
 * Simplified user requirements for course generation
 * All details (topic, duration, style, etc.) should be included in the requirement text
 */
export interface UserRequirements {
    requirement: string;
    language: 'zh-CN' | 'en-US';
    userNickname?: string;
    userBio?: string;
    webSearch?: boolean;
}
/**
 * @deprecated Use UserRequirements instead
 * Legacy structured requirements - kept for backward compatibility
 */
export interface LegacyUserRequirements {
    topic: string;
    description?: string;
    learningObjectives: string[];
    audience: AudienceProfile;
    durationMinutes: number;
    style: StylePreferences;
    documents?: UploadedDocument[];
    additionalNotes?: string;
}
/**
 * Simplified scene outline
 * Gives AI more freedom, only requiring intent description and key points
 */
export interface SceneOutline {
    id: string;
    type: 'slide' | 'quiz' | 'interactive' | 'pbl';
    title: string;
    description: string;
    keyPoints: string[];
    teachingObjective?: string;
    estimatedDuration?: number;
    order: number;
    language?: 'zh-CN' | 'en-US';
    suggestedImageIds?: string[];
    mediaGenerations?: MediaGenerationRequest[];
    quizConfig?: {
        questionCount: number;
        difficulty: 'easy' | 'medium' | 'hard';
        questionTypes: ('single' | 'multiple' | 'text')[];
    };
    interactiveConfig?: {
        conceptName: string;
        conceptOverview: string;
        designIdea: string;
        subject?: string;
    };
    pblConfig?: {
        projectTopic: string;
        projectDescription: string;
        targetSkills: string[];
        issueCount?: number;
        language: 'zh-CN' | 'en-US';
    };
}
/**
 * AI-generated slide content
 */
export interface GeneratedSlideContent {
    elements: PPTElement[];
    background?: SlideBackground;
    remark?: string;
}
/**
 * AI-generated quiz content
 */
export interface GeneratedQuizContent {
    questions: QuizQuestion[];
}
/**
 * AI-generated PBL content
 */
export interface GeneratedPBLContent {
    projectConfig: PBLProjectConfig;
}
/**
 * Scientific model output from scientific modeling stage
 */
export interface ScientificModel {
    core_formulas: string[];
    mechanism: string[];
    constraints: string[];
    forbidden_errors: string[];
}
/**
 * AI-generated interactive content
 */
export interface GeneratedInteractiveContent {
    html: string;
    scientificModel?: ScientificModel;
}
export interface SuggestedSlideElement {
    type: 'text' | 'image' | 'shape' | 'chart' | 'latex' | 'line';
    purpose: 'title' | 'subtitle' | 'content' | 'example' | 'diagram' | 'formula' | 'highlight';
    contentHint: string;
    position?: 'top' | 'center' | 'bottom' | 'left' | 'right';
    chartType?: 'bar' | 'line' | 'pie' | 'radar';
    textOutline?: string[];
}
export interface SuggestedQuizQuestion {
    type: 'single' | 'multiple' | 'short_answer';
    questionOutline: string;
    suggestedOptions?: string[];
    targetConceptId?: string;
    difficulty: 'easy' | 'medium' | 'hard';
}
export interface SuggestedAction {
    type: ActionType;
    description: string;
    timing?: 'start' | 'middle' | 'end' | 'after-content';
}
export interface GenerationProgress {
    currentStage: 1 | 2 | 3;
    overallProgress: number;
    stageProgress: number;
    statusMessage: string;
    scenesGenerated: number;
    totalScenes: number;
    errors?: string[];
}
export interface GenerationSession {
    id: string;
    requirements: UserRequirements;
    sceneOutlines?: SceneOutline[];
    progress: GenerationProgress;
    startedAt: Date;
    completedAt?: Date;
    generatedStageId?: string;
}
//# sourceMappingURL=generation.d.ts.map