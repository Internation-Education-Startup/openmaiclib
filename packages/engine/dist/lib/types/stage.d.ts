import { Slide } from './slides';
import { Action } from './action';
import { PBLProjectConfig } from '../pbl/types';
export type SceneType = 'slide' | 'quiz' | 'interactive' | 'pbl';
export type StageMode = 'autonomous' | 'playback';
export type Whiteboard = Omit<Slide, 'theme' | 'turningMode' | 'sectionTag' | 'type'>;
/**
 * Stage - Represents the entire classroom/course
 */
export interface Stage {
    id: string;
    name: string;
    description?: string;
    createdAt: number;
    updatedAt: number;
    language?: string;
    style?: string;
    whiteboard?: Whiteboard[];
    agentIds?: string[];
}
/**
 * Scene - Represents a single page/scene in the course
 */
export interface Scene {
    id: string;
    stageId: string;
    type: SceneType;
    title: string;
    order: number;
    content: SceneContent;
    actions?: Action[];
    whiteboards?: Slide[];
    multiAgent?: {
        enabled: boolean;
        agentIds: string[];
        directorPrompt?: string;
    };
    createdAt?: number;
    updatedAt?: number;
}
/**
 * Scene content based on type
 */
export type SceneContent = SlideContent | QuizContent | InteractiveContent | PBLContent;
/**
 * Slide content - PPTist Canvas data
 */
export interface SlideContent {
    type: 'slide';
    canvas: Slide;
}
/**
 * Quiz content - React component props/data
 */
export interface QuizContent {
    type: 'quiz';
    questions: QuizQuestion[];
}
export interface QuizOption {
    label: string;
    value: string;
}
export interface QuizQuestion {
    id: string;
    type: 'single' | 'multiple' | 'short_answer';
    question: string;
    options?: QuizOption[];
    answer?: string[];
    analysis?: string;
    commentPrompt?: string;
    hasAnswer?: boolean;
    points?: number;
}
/**
 * Interactive content - Interactive web page (iframe)
 */
export interface InteractiveContent {
    type: 'interactive';
    url: string;
    html?: string;
}
/**
 * PBL content - Project-based learning
 */
export interface PBLContent {
    type: 'pbl';
    projectConfig: PBLProjectConfig;
}
export type { UserRequirements, SceneOutline, GenerationSession, GenerationProgress, UploadedDocument, } from './generation';
