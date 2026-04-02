import { Scene, SceneType, SceneContent, SlideContent, QuizContent, InteractiveContent, PBLContent } from '../types/stage';
/**
 * Generate a unique ID
 */
export declare function generateId(prefix?: string): string;
/**
 * Validate whether a Scene ID exists
 */
export declare function validateSceneId(scenes: Scene[], sceneId: string): boolean;
/**
 * Get a Scene
 */
export declare function getScene(scenes: Scene[], sceneId: string): Scene | null;
/**
 * Create default SlideContent
 */
export declare function createDefaultSlideContent(): SlideContent;
/**
 * Create default QuizContent
 */
export declare function createDefaultQuizContent(): QuizContent;
/**
 * Create default InteractiveContent
 */
export declare function createDefaultInteractiveContent(): InteractiveContent;
/**
 * Create default PBLContent
 */
export declare function createDefaultPBLContent(): PBLContent;
/**
 * Create default Content based on type
 */
export declare function createDefaultContent(type: SceneType): SceneContent;
